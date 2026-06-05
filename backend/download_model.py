"""
Run this script on a new device to download the MiniLM model from HuggingFace
and save it locally to backend/models/minilm.
"""
import os
from pathlib import Path
from sentence_transformers import SentenceTransformer

def download_model():
    model_name = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    save_path = Path(__file__).resolve().parent / "models" / "minilm"
    
    print(f"Downloading {model_name} from HuggingFace...")
    print("This requires an internet connection.")
    
    try:
        # This downloads the model to the huggingface cache and loads it
        model = SentenceTransformer(model_name)
        
        # This saves a copy entirely offline to our local folder
        os.makedirs(save_path, exist_ok=True)
        model.save(str(save_path))
        
        print(f"✅ Success! Model saved locally to: {save_path}")
        print("You can now run: python -m ingestion.ingest")
        
    except Exception as e:
        print(f"❌ Error downloading model: {e}")
        print("If you have no internet, copy the 'models' folder from your old PC using a USB drive.")

if __name__ == "__main__":
    download_model()
