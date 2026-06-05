import sys
from pathlib import Path

_BACKEND_DIR = Path(__file__).resolve().parent
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

from config import get_config
from retrieval.search import HybridSearchEngine
from retrieval.prompt_engine import build_prompt
from llm_service.inference import generate_response
import json

def test():
    cfg = get_config()
    query = "How I can file divorce legally?"
    
    print("Searching...")
    engine = HybridSearchEngine(cfg)
    results = engine.search(query, top_k=5)
    
    for i, r in enumerate(results):
        print(f"Doc {i}: {r['source']} - {r['text'][:50]}...")
        
    print("\nBuilding Prompt...")
    sys_p, usr_p = build_prompt(query, results)
    
    print("\nGenerating Response...")
    try:
        response = generate_response(sys_p, usr_p)
        print("FINAL JSON:")
        print(json.dumps(response, indent=2))
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    test()
