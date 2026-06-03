# Qanoon Agahi - Backend RAG Pipeline

This is the backend for the local, privacy-first legal RAG system.

## 🚀 How to run on a new system

If you just cloned this from Git, follow these steps to get the backend running:

### 1. Create a Virtual Environment
Navigate to the `backend` folder and create an isolated Python environment:
```powershell
cd backend
python -m venv venv
```

### 2. Activate the Environment
* **Windows (PowerShell):** `.\venv\Scripts\Activate`
* **Windows (Cmd):** `venv\Scripts\activate.bat`
* **Mac/Linux:** `source venv/bin/activate`

### 3. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 4. Rebuild the Database
Git does not store the `db/` folder (the vector database) because it can be gigabytes in size. You will need to rebuild it on the new machine:
```powershell
python -m ingestion.ingest
```
*(This will read your PDFs/JSONs from `data/raw/` and rebuild the ChromaDB locally).*

### 5. Test it!
Verify that the retrieval engine works:
```powershell
python -m tests.test_retrieval
```
