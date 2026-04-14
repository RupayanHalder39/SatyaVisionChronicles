# SatyaVisionChronicles
A production-grade, PDF-driven platform for the SatyaVision research journey. This repository contains a FastAPI + PostgreSQL backend and a React + Tailwind frontend built to mirror the claymorphic Figma design.

## Project Structure
- `backend/` — FastAPI service, SQLAlchemy models, seed pipeline
- `frontend/` — Vite + React application (Journey + Dashboard modes)
- `SatyaVisionChroniclesDesign/` — Source PDF + design reference (external directory)

## Backend Setup
1. Create a virtual environment and install dependencies:
```bash
cd /Users/rupayan/SatyaVisionChronicles/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Configure environment:
```bash
cp .env.example .env
```
Update `DATABASE_URL` for your PostgreSQL instance if needed.

3. (Recommended) Automated setup (env + DB check + seed):
```bash
python scripts/setup_backend.py
```

4. Seed the database from the PDF (manual):
```bash
python -m app.db.seed_data
```

5. Run the backend:
```bash
uvicorn app.main:app --reload
```

## Frontend Setup
1. Install dependencies:
```bash
cd /Users/rupayan/SatyaVisionChronicles/frontend
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Run the frontend:
```bash
npm run dev
```

## Notes
- The ingestion pipeline reads `/Users/rupayan/SatyaVisionChroniclesDesign/IEDC Book 2.pdf` by default.
- If parsing is imperfect, the schema is designed to allow manual corrections later.
- No hardcoded content is used. All narrative data is served from PostgreSQL.
