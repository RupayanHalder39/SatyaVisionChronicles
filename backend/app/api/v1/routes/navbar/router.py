from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.responses import NavbarResponse
from app.schemas.common import Pagination
from app.services.content_service import list_navbar_items

router = APIRouter(prefix="/navbar", tags=["navbar"])


@router.get("", response_model=NavbarResponse)
def get_navbar_items(
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=200),
    db: Session = Depends(get_db),
):
    items, total = list_navbar_items(db, offset, limit)
    return {
        "items": items,
        "pagination": Pagination(total=total, limit=limit, offset=offset),
    }
