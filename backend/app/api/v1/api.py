from fastapi import APIRouter

from app.api.v1.routes.navbar.router import router as navbar_router
from app.api.v1.routes.overview.router import router as overview_router
from app.api.v1.routes.research.router import router as research_router
from app.api.v1.routes.projects.router import router as projects_router
from app.api.v1.routes.achievements.router import router as achievements_router
from app.api.v1.routes.contributors.router import router as contributors_router
from app.api.v1.routes.gallery.router import router as gallery_router

api_router = APIRouter()
api_router.include_router(navbar_router)
api_router.include_router(overview_router)
api_router.include_router(research_router)
api_router.include_router(projects_router)
api_router.include_router(achievements_router)
api_router.include_router(contributors_router)
api_router.include_router(gallery_router)
