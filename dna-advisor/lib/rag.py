from typing import List, Optional

# Langchain
from langchain_core.embeddings import Embeddings
from langchain_community.document_loaders.directory import DirectoryLoader

# Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document

# DB
from langchain.vectorstores.chroma import Chroma

# ===================
#   Data Processing
# ===================


def embed_chunk_ids(chunks: List[Document]):
    _chunks = chunks.copy()

    last_source = None
    chunk_index = 0

    for chunk in _chunks:
        source = chunk.metadata.get("source")

        if source == last_source:
            chunk_index += 1
        else:
            last_source = source
            chunk_index = 0

        chunk.metadata["chunk_id"] = f"{source}:{chunk_index}"

    return _chunks


def chunk(documents: List[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len,
        is_separator_regex=False,
    )

    return text_splitter.split_documents(documents)


# ===================
#      ChromeDb
# ===================


class Rag:
    def __init__(self, documents: Optional[List[Document]], embedding: Embeddings):
        self._db = Chroma(persist_directory="./chroma", embedding_function=embedding)

        if documents:
            self.add_documents(documents)

    @staticmethod
    def read_documents(dir: str):
        print("Loading documents...")
        try:
            loader = DirectoryLoader(
                dir, glob="**/*", use_multithreading=True, show_progress=True
            )
            return loader.load()
            # return None  # Disable document loading
        except FileNotFoundError:
            print(f'Documents folder "{dir}" not found, skipping document processing.')
            return None

        # TODO: Figure out a way to only process new documents.
        # NOTE: Loading documents takes some time, even more so when it includes OCR in PDFs.
        # ChromaDB has a persistant store feature and so we do not need to load these
        # documents on every startup.
        # This will improve quality of life for development only since production only has to (ideally)
        # load these files once in a while.

    def add_documents(self, documents: List[Document]):
        chunks = embed_chunk_ids(chunk(documents))

        # Get a list of existing embeddings in the database
        existing_items = self._db.get(include=[])
        existing_ids = set(existing_items["ids"])
        print(f"Number of existing documents in DB: {len(existing_ids)}")

        # Only add documents that don't exist in the DB.
        new_chunks = []
        for _chunk in chunks:
            if _chunk.metadata["chunk_id"] not in existing_ids:
                new_chunks.append(_chunk)

        # If we have new chunks, we should add these documents to the database with a unique id
        if len(new_chunks):
            print(f"Chunks found: {len(new_chunks)}")
            new_chunk_ids = [chunk.metadata["chunk_id"] for chunk in new_chunks]
            self._db.add_documents(new_chunks, ids=new_chunk_ids)
            self._db.persist()

    def get_context(self, prompt: str):
        results = self._db.similarity_search_with_score(prompt, k=5)

        context = []

        for doc, _score in results:
            print(_score)
            context.append(doc.page_content)

        # # Print the sources used to generate context
        # sources = [doc.metadata.get("chunk_id", None) for doc, _ in results]
        # formatted_response = f"Sources: {sources}"
        # print(formatted_response)

        return "\n\n".join(context)
