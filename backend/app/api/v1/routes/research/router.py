from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.responses import ResearchDomainsResponse
from app.schemas.common import Pagination
from app.services.content_service import list_research_domains

router = APIRouter(prefix="/research", tags=["research"])


@router.get("/domains", response_model=ResearchDomainsResponse)
def get_research_domains(
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    items, total = list_research_domains(db, offset, limit)
    return {
        "items": items,
        "pagination": Pagination(total=total, limit=limit, offset=offset),
    }
