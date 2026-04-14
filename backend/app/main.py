from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1.api import api_router


app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    Path(settings.static_dir).mkdir(parents=True, exist_ok=True)


app.mount("/static", StaticFiles(directory=settings.static_dir), name="static")
app.include_router(api_router, prefix=settings.api_prefix)


@app.get("/health")
def health_check():
    return {"status": "ok"}
