import os
from sentence_transformers import SentenceTransformer
from pathlib import Path

# This script loads the model from the HuggingFace cache and saves it locally.
print("Loading model from cache...")
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2", local_files_only=True)

local_path = Path("./models/minilm")
local_path.mkdir(parents=True, exist_ok=True)

print(f"Saving model directly to {local_path.absolute()}...")
model.save(str(local_path))
print("Done! The model is now completely offline.")
