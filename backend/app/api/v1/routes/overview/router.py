from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.schemas.responses import SectionsResponse
from app.schemas.common import Pagination
from app.services.content_service import list_sections

router = APIRouter(prefix="/overview", tags=["overview"])


@router.get("", response_model=SectionsResponse)
def get_sections(
    kind: Optional[str] = Query(None),
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=200),
    db: Session = Depends(get_db),
):
    items, total = list_sections(db, kind, offset, limit)
    return {
        "items": items,
        "pagination": Pagination(total=total, limit=limit, offset=offset),
    }
