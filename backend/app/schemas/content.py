from datetime import date
from typing import Optional
from pydantic import BaseModel, Field


class ImageOut(BaseModel):
    id: int
    file_path: Optional[str] = None
    caption: Optional[str] = None
    kind: Optional[str] = None
    source_page: Optional[int] = None
    order_index: int

    model_config = {"from_attributes": True}


class SubsectionOut(BaseModel):
    id: int
    title: Optional[str] = None
    content: Optional[str] = None
    order_index: int

    model_config = {"from_attributes": True}


class SectionOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    kind: str
    order_index: int
    page_start: Optional[int] = None
    page_end: Optional[int] = None
    subsections: list[SubsectionOut] = []
    images: list[ImageOut] = []

    model_config = {"from_attributes": True}


class ResearchDomainOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    importance: int
    order_index: int
    images: list[ImageOut] = []

    model_config = {"from_attributes": True}


class ContributorOut(BaseModel):
    id: int
    name: str
    role: Optional[str] = None
    bio: Optional[str] = None
    affiliation: Optional[str] = None
    email: Optional[str] = None
    order_index: int
    images: list[ImageOut] = []

    model_config = {"from_attributes": True}


class ProjectOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: Optional[str] = None
    tech_stack: Optional[list[str]] = None
    impact: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    order_index: int
    contributors: list[ContributorOut] = []
    research_domains: list[ResearchDomainOut] = []
    images: list[ImageOut] = []

    model_config = {"from_attributes": True}


class AchievementOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    badge: Optional[str] = None
    date: Optional[date] = None
    order_index: int
    images: list[ImageOut] = []

    model_config = {"from_attributes": True}


class NavbarItemOut(BaseModel):
    id: int
    label: str
    route: str
    icon: Optional[str] = None
    order_index: int

    model_config = {"from_attributes": True}


class GalleryItemOut(BaseModel):
    id: int
    file_path: Optional[str] = None
    caption: Optional[str] = None
    kind: Optional[str] = None
    source_page: Optional[int] = None
    order_index: int

    model_config = {"from_attributes": True}
