from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.responses import AchievementsResponse
from app.schemas.common import Pagination
from app.services.content_service import list_achievements

router = APIRouter(prefix="/achievements", tags=["achievements"])


@router.get("", response_model=AchievementsResponse)
def get_achievements(
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    items, total = list_achievements(db, offset, limit)
    return {
        "items": items,
        "pagination": Pagination(total=total, limit=limit, offset=offset),
    }
