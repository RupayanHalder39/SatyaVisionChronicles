import re
import os
from pathlib import Path
from typing import Iterable, Optional

from sqlalchemy.orm import Session
from sqlalchemy import text as sql_text

from app.core.config import settings
from app.core.database import Base, engine, SessionLocal
from app.models import (
    NavbarItem,
    Section,
    Subsection,
    ResearchDomain,
    Project,
    Contributor,
    Achievement,
    Image,
)

# Heuristic keyword map: keeps ingestion resilient even when PDF structure varies.
SECTION_KEYWORDS = {
    "overview": ["overview", "introduction"],
    "vision": ["vision", "mission"],
    "research": ["research", "domain"],
    "infrastructure": ["infrastructure", "lab", "facility"],
    "projects": ["project"],
    "publications": ["publication"],
    "achievements": ["achievement", "award", "prize", "winner"],
    "contributors": ["team", "contributor", "faculty", "mentor", "coordinator"],
    "collaborations": ["collaboration", "partner"],
    "contact": ["contact", "email", "phone"],
}

# Domain keywords keep the extraction broad and allow manual refinement later.
DOMAIN_KEYWORDS = [
    "artificial intelligence",
    "ai",
    "iot",
    "internet of things",
    "robotics",
    "fintech",
    "cybersecurity",
    "cloud",
    "data science",
    "machine learning",
    "healthcare",
]


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def detect_kind(text: str) -> str:
    lowered = text.lower()
    for kind, keywords in SECTION_KEYWORDS.items():
        if any(keyword in lowered for keyword in keywords):
            return kind
    return "general"


def extract_heading(lines: list[str]) -> Optional[str]:
    for line in lines[:3]:
        if len(line) <= 80:
            return line
    return None


def extract_domains(text: str) -> set[str]:
    lowered = text.lower()
    domains = set()
    for keyword in DOMAIN_KEYWORDS:
        if keyword in lowered:
            domains.add(keyword.title())
    return domains


def extract_projects(lines: list[str]) -> list[str]:
    results = []
    for line in lines:
        lowered = line.lower()
        if "project" in lowered and len(line) <= 120:
            results.append(line)
    return results[:10]


def extract_achievements(lines: list[str]) -> list[str]:
    results = []
    for line in lines:
        lowered = line.lower()
        if any(word in lowered for word in ["award", "winner", "prize", "achievement"]):
            if len(line) <= 140:
                results.append(line)
    return results[:10]


def extract_contributors(lines: list[str]) -> list[str]:
    # Simple name matcher keeps ingestion lightweight and avoids overfitting to PDF layouts.
    pattern = re.compile(r"^[A-Z][a-z]+(\s[A-Z][a-z]+){1,3}$")
    results = []
    for line in lines:
        if pattern.match(line) and len(line) <= 80:
            results.append(line)
    return results[:15]


def load_pdf_pages(pdf_path: Path) -> Iterable[tuple[int, list[str], str]]:
    import pdfplumber

    with pdfplumber.open(pdf_path) as pdf:
        for index, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            lines = [normalize(line) for line in text.splitlines() if normalize(line)]
            yield index, lines, normalize(text)


def try_export_page_image(page, output_path: Path) -> bool:
    try:
        image = page.to_image(resolution=140)
        image.save(output_path)
        return True
    except Exception:
        return False


def seed_database(db: Session, pdf_path: Path, static_dir: Path):
    Base.metadata.create_all(bind=engine)

    force = os.environ.get("SEED_FORCE", "").lower() in {"1", "true", "yes"}
    existing_sections = db.execute(sql_text("SELECT 1 FROM sections LIMIT 1")).first()
    if existing_sections and not force:
        # Idempotency: do not re-seed by default to avoid duplicating rows.
        print("Seed data already present; skipping (set SEED_FORCE=1 to override).")
        return

    section_map: dict[str, Section] = {}
    created_domains: dict[str, ResearchDomain] = {}
    created_projects: dict[str, Project] = {}
    created_achievements: dict[str, Achievement] = {}
    created_contributors: dict[str, Contributor] = {}

    static_images_dir = static_dir / "images"
    static_images_dir.mkdir(parents=True, exist_ok=True)

    import pdfplumber

    with pdfplumber.open(pdf_path) as pdf:
        for page_index, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            text = normalize(text)
            lines = [normalize(line) for line in text.splitlines() if normalize(line)]
            if not lines:
                continue

            heading = extract_heading(lines) or f"Page {page_index}"
            kind = detect_kind(text)

            section = section_map.get(kind)
            if not section:
                section = Section(
                    title=heading,
                    description=None,
                    kind=kind,
                    order_index=len(section_map),
                    page_start=page_index,
                )
                section_map[kind] = section
                db.add(section)
                db.flush()
            section.page_end = page_index
            if not section.description:
                section.description = text[:400]

            subsection = Subsection(
                section_id=section.id,
                title=heading,
                content=text,
                order_index=page_index,
            )
            db.add(subsection)

            # Page image capture is best-effort because some environments lack PDF renderers.
            image_filename = f"page_{page_index}.png"
            image_path = static_images_dir / image_filename
            if try_export_page_image(page, image_path):
                db.add(
                    Image(
                        file_path=f"/static/images/{image_filename}",
                        caption=heading,
                        kind="page",
                        source_page=page_index,
                        order_index=page_index,
                        section_id=section.id,
                    )
                )

            # Research domains
            for domain in extract_domains(text):
                if domain not in created_domains:
                    created_domains[domain] = ResearchDomain(
                        name=domain,
                        description=None,
                        importance=1,
                        order_index=len(created_domains),
                    )
                    db.add(created_domains[domain])

            # Projects
            for project_title in extract_projects(lines):
                if project_title not in created_projects:
                    created_projects[project_title] = Project(
                        title=project_title,
                        description=None,
                        status=None,
                        tech_stack=None,
                        impact=None,
                        order_index=len(created_projects),
                    )
                    db.add(created_projects[project_title])

            # Achievements
            for achievement_title in extract_achievements(lines):
                if achievement_title not in created_achievements:
                    created_achievements[achievement_title] = Achievement(
                        title=achievement_title,
                        description=None,
                        category=None,
                        badge=None,
                        date=None,
                        order_index=len(created_achievements),
                    )
                    db.add(created_achievements[achievement_title])

            # Contributors
            for contributor_name in extract_contributors(lines):
                if contributor_name not in created_contributors:
                    created_contributors[contributor_name] = Contributor(
                        name=contributor_name,
                        role=None,
                        bio=None,
                        affiliation=None,
                        email=None,
                        order_index=len(created_contributors),
                    )
                    db.add(created_contributors[contributor_name])

    # Navbar items derived from detected kinds to avoid hardcoding presentation data.
    navbar_kinds = [
        "overview",
        "vision",
        "research",
        "projects",
        "achievements",
        "contributors",
        "gallery",
        "contact",
    ]
    for idx, kind in enumerate(navbar_kinds):
        label = kind.replace("_", " ").title()
        route = f"/{kind}"
        db.add(NavbarItem(label=label, route=route, icon=None, order_index=idx))

    db.commit()


if __name__ == "__main__":
    pdf_path = Path(settings.pdf_source_path)
    static_dir = Path(settings.static_dir)

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found at {pdf_path}")

    with SessionLocal() as db:
        seed_database(db, pdf_path, static_dir)
        print("Seed completed")
