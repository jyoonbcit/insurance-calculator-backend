from typing import List, Optional

# Langchain
from langchain_core.embeddings import Embeddings
from langchain_community.document_loaders.directory import DirectoryLoader

# Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document

# DB
from supabase._sync.client import SyncClient
from langchain_community.vectorstores.supabase import SupabaseVectorStore

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


class Rag:
    def __init__(
        self,
        supabase_client: SyncClient,
        documents: Optional[List[Document]],
        embedding: Embeddings,
    ):
        self._db = SupabaseVectorStore(
            client=supabase_client,
            embedding=embedding,
            table_name="documents",
            query_name="match_documents",
        )
        if documents:
            self.add_documents(documents)
        else:
            print("[RAG] No documents provided.")

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
        print(
            f"[RAD] Adding {len(documents)} ({len(chunks)} chunks) documents to Supabase..."
        )
        self._db.add_documents(chunks)

        # TODO: Add checks to filter out existing data and add only new chunks

    def get_context(self, prompt: str):
        results = self._db.similarity_search(prompt, k=5)

        context = []

        for doc in results:
            context.append(doc.page_content)

        # # Print the sources used to generate context
        # sources = [doc.metadata.get("chunk_id", None) for doc, _ in results]
        # formatted_response = f"Sources: {sources}"
        # print(formatted_response)

        return "\n\n".join(context)
