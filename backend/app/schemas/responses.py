from pydantic import BaseModel
from app.schemas.common import Pagination
from app.schemas.content import (
    SectionOut,
    ResearchDomainOut,
    ProjectOut,
    ContributorOut,
    AchievementOut,
    NavbarItemOut,
    GalleryItemOut,
)


class SectionsResponse(BaseModel):
    items: list[SectionOut]
    pagination: Pagination


class ResearchDomainsResponse(BaseModel):
    items: list[ResearchDomainOut]
    pagination: Pagination


class ProjectsResponse(BaseModel):
    items: list[ProjectOut]
    pagination: Pagination


class ContributorsResponse(BaseModel):
    items: list[ContributorOut]
    pagination: Pagination


class AchievementsResponse(BaseModel):
    items: list[AchievementOut]
    pagination: Pagination


class NavbarResponse(BaseModel):
    items: list[NavbarItemOut]
    pagination: Pagination


class GalleryResponse(BaseModel):
    items: list[GalleryItemOut]
    pagination: Pagination
