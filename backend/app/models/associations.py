from sqlalchemy import Table, Column, ForeignKey, Integer

from app.core.database import Base


project_contributors = Table(
    "project_contributors",
    Base.metadata,
    Column("project_id", ForeignKey("projects.id"), primary_key=True),
    Column("contributor_id", ForeignKey("contributors.id"), primary_key=True),
)

project_research_domains = Table(
    "project_research_domains",
    Base.metadata,
    Column("project_id", ForeignKey("projects.id"), primary_key=True),
    Column("research_domain_id", ForeignKey("research_domains.id"), primary_key=True),
)
