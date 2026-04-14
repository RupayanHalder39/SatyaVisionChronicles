from typing import Optional
from sqlalchemy.orm import Session, selectinload

from app.models import (
    NavbarItem,
    Section,
    ResearchDomain,
    Project,
    Contributor,
    Achievement,
    Image,
)
from app.utils.pagination import paginate


def list_navbar_items(db: Session, offset: int, limit: int):
    query = db.query(NavbarItem).order_by(NavbarItem.order_index)
    return paginate(query, offset, limit)


def list_sections(db: Session, kind: Optional[str], offset: int, limit: int):
    query = db.query(Section).options(
        selectinload(Section.subsections),
        selectinload(Section.images),
    )
    if kind:
        query = query.filter(Section.kind == kind)
    query = query.order_by(Section.order_index)
    return paginate(query, offset, limit)


def list_research_domains(db: Session, offset: int, limit: int):
    query = db.query(ResearchDomain).options(selectinload(ResearchDomain.images))
    query = query.order_by(ResearchDomain.order_index)
    return paginate(query, offset, limit)


def list_projects(db: Session, offset: int, limit: int):
    query = db.query(Project).options(
        selectinload(Project.contributors).selectinload(Contributor.images),
        selectinload(Project.research_domains),
        selectinload(Project.images),
    )
    query = query.order_by(Project.order_index)
    return paginate(query, offset, limit)


def list_contributors(db: Session, offset: int, limit: int):
    query = db.query(Contributor).options(selectinload(Contributor.images))
    query = query.order_by(Contributor.order_index)
    return paginate(query, offset, limit)


def list_achievements(db: Session, offset: int, limit: int):
    query = db.query(Achievement).options(selectinload(Achievement.images))
    query = query.order_by(Achievement.order_index)
    return paginate(query, offset, limit)


def list_gallery(db: Session, offset: int, limit: int):
    query = db.query(Image).order_by(Image.order_index)
    return paginate(query, offset, limit)
