from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.responses import ContributorsResponse
from app.schemas.common import Pagination
from app.services.content_service import list_contributors

router = APIRouter(prefix="/contributors", tags=["contributors"])


@router.get("", response_model=ContributorsResponse)
def get_contributors(
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    items, total = list_contributors(db, offset, limit)
    return {
        "items": items,
        "pagination": Pagination(total=total, limit=limit, offset=offset),
    }
