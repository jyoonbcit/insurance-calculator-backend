import os
import argparse

from lib.model import GPT4AllModel
from lib.rag import Rag
from api import create_api

# Load model directly
from huggingface_hub import hf_hub_download

#
from supabase.client import create_client


# def find_model_template(model) -> str:
#     template_file = os.path.splitext(model)[0] + '.json'
#     with open(template_file, 'r') as f:
#         data = json.load(f)
#
#         return data.get('instruction_template')


def initialize_model(path: str, template: str, loader):
    # inst_templ = find_model_template(path)

    print(f"[MODEL] Using model: {path}")
    print(f"[MODEL] Instruction Template: ***\n{template}\n***")

    if loader == GPT4AllModel:
        return loader(model=path, instruction_template=inst_templ)

    raise Exception(f"Could not load the model at: '{path}'")


if __name__ == "__main__":
    DEFAULT_ADDRESS = "https://dna-advisor.onrender.com"
    DEFAULT_PORT = 3001
    DOCUMENTS_DIR = os.getenv("DOCUMENTS", "./documents")
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--host", help="Address to bind the application to", default=DEFAULT_ADDRESS
    )
    parser.add_argument(
        "--port", help="Port to bind the application to", default=DEFAULT_PORT
    )
    parser.add_argument(
        "--supabase-url", help="URL to your Supabase instance", default=SUPABASE_URL
    )
    parser.add_argument(
        "--supabase-key", help="Your Supabase access key", default=SUPABASE_KEY
    )
    parser.add_argument(
        "-d",
        "--documents",
        help="Define the root documents directory",
        default=DOCUMENTS_DIR,
    )
    args = parser.parse_args()

    # Define the model to download
    model_name = "TheBloke/TinyLlama-1.1B-1T-OpenOrca-GGUF"
    model_file = "tinyllama-1.1b-1t-openorca.Q4_K_M.gguf"
    model_path = hf_hub_download(model_name, filename=model_file)

    # Include the instruction template for that model, be sure it includes a "{system}" and "{prompt}" placeholder
    inst_templ = "<|im_start|>system\n{system}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistants"

    # Load the model
    model = initialize_model(path=model_path, template=inst_templ, loader=GPT4AllModel)

    # Load the documents to be embedded and stored in a vector db
    documents = Rag.read_documents(args.documents)

    rag = None

    if args.supabase_url and args.supabase_key:
        supabase_client = create_client(args.supabase_url, args.supabase_key)
        rag = Rag(
            supabase_client=supabase_client,
            documents=documents,
            embedding=model.getEmbeddings(),
        )

    # If there are no errors, tell the model to use RAG
    if rag:
        model.setRagCapabilities(rag)

    api = create_api(model)
    api.run(host=args.host, port=args.port)
