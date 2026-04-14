from __future__ import annotations

from datetime import datetime, date
from typing import Optional, List
from sqlalchemy import String, Text, Integer, Date, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.associations import project_contributors, project_research_domains


class NavbarItem(Base):
    __tablename__ = "navbar_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    label: Mapped[str] = mapped_column(String(120), nullable=False)
    route: Mapped[str] = mapped_column(String(200), nullable=False)
    icon: Mapped[Optional[str]] = mapped_column(String(120))
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)


class Section(Base):
    __tablename__ = "sections"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    kind: Mapped[str] = mapped_column(String(80), index=True)
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)
    page_start: Mapped[Optional[int]] = mapped_column(Integer)
    page_end: Mapped[Optional[int]] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    subsections: Mapped[list["Subsection"]] = relationship(
        back_populates="section", cascade="all, delete-orphan", order_by="Subsection.order_index"
    )
    images: Mapped[list["Image"]] = relationship(back_populates="section")


class Subsection(Base):
    __tablename__ = "subsections"

    id: Mapped[int] = mapped_column(primary_key=True)
    section_id: Mapped[int] = mapped_column(ForeignKey("sections.id"), index=True)
    title: Mapped[Optional[str]] = mapped_column(String(200))
    content: Mapped[Optional[str]] = mapped_column(Text)
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)

    section: Mapped[Section] = relationship(back_populates="subsections")


class ResearchDomain(Base):
    __tablename__ = "research_domains"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    importance: Mapped[int] = mapped_column(Integer, default=1)
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)

    projects: Mapped[list["Project"]] = relationship(
        secondary=project_research_domains, back_populates="research_domains"
    )
    images: Mapped[list["Image"]] = relationship(back_populates="research_domain")


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[Optional[str]] = mapped_column(String(60))
    tech_stack: Mapped[Optional[List[str]]] = mapped_column(JSON)
    impact: Mapped[Optional[str]] = mapped_column(Text)
    start_date: Mapped[Optional[date]] = mapped_column(Date)
    end_date: Mapped[Optional[date]] = mapped_column(Date)
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)

    contributors: Mapped[list["Contributor"]] = relationship(
        secondary=project_contributors, back_populates="projects"
    )
    research_domains: Mapped[list[ResearchDomain]] = relationship(
        secondary=project_research_domains, back_populates="projects"
    )
    images: Mapped[list["Image"]] = relationship(back_populates="project")


class Contributor(Base):
    __tablename__ = "contributors"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    role: Mapped[Optional[str]] = mapped_column(String(160))
    bio: Mapped[Optional[str]] = mapped_column(Text)
    affiliation: Mapped[Optional[str]] = mapped_column(String(200))
    email: Mapped[Optional[str]] = mapped_column(String(200))
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)

    projects: Mapped[list[Project]] = relationship(
        secondary=project_contributors, back_populates="contributors"
    )
    images: Mapped[list["Image"]] = relationship(back_populates="contributor")


class Achievement(Base):
    __tablename__ = "achievements"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    category: Mapped[Optional[str]] = mapped_column(String(120))
    badge: Mapped[Optional[str]] = mapped_column(String(120))
    date: Mapped[Optional[date]] = mapped_column(Date)
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)

    images: Mapped[list["Image"]] = relationship(back_populates="achievement")


class Image(Base):
    __tablename__ = "images"

    id: Mapped[int] = mapped_column(primary_key=True)
    file_path: Mapped[Optional[str]] = mapped_column(String(300))
    caption: Mapped[Optional[str]] = mapped_column(Text)
    kind: Mapped[Optional[str]] = mapped_column(String(80))
    source_page: Mapped[Optional[int]] = mapped_column(Integer, index=True)
    order_index: Mapped[int] = mapped_column(Integer, default=0, index=True)

    section_id: Mapped[Optional[int]] = mapped_column(ForeignKey("sections.id"))
    project_id: Mapped[Optional[int]] = mapped_column(ForeignKey("projects.id"))
    contributor_id: Mapped[Optional[int]] = mapped_column(ForeignKey("contributors.id"))
    achievement_id: Mapped[Optional[int]] = mapped_column(ForeignKey("achievements.id"))
    research_domain_id: Mapped[Optional[int]] = mapped_column(ForeignKey("research_domains.id"))

    section: Mapped[Optional[Section]] = relationship(back_populates="images")
    project: Mapped[Optional[Project]] = relationship(back_populates="images")
    contributor: Mapped[Optional[Contributor]] = relationship(back_populates="images")
    achievement: Mapped[Optional[Achievement]] = relationship(back_populates="images")
    research_domain: Mapped[Optional[ResearchDomain]] = relationship(back_populates="images")
