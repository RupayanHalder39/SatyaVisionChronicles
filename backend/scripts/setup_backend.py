import os
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse, unquote


TARGET_DATABASE_URL = "postgresql://rupayan@localhost:5432/satyavision"
TARGET_PDF_PATH = "/Users/rupayan/SatyaVisionChroniclesDesign/IEDC Book 2.pdf"


@dataclass(frozen=True)
class DbParams:
    user: Optional[str]
    password: Optional[str]
    host: str
    port: int
    dbname: str


def log(message: str) -> None:
    print(message)


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def ensure_env_file(backend_dir: Path) -> DbParams:
    env_example = backend_dir / ".env.example"
    env_path = backend_dir / ".env"

    if not env_example.exists():
        fail(f"Missing {env_example}")

    if not env_path.exists():
        shutil.copyfile(env_example, env_path)

    content = env_path.read_text(encoding="utf-8").splitlines()
    updated: list[str] = []
    has_db = False
    has_pdf = False
    for line in content:
        if line.startswith("DATABASE_URL="):
            updated.append(f"DATABASE_URL={TARGET_DATABASE_URL}")
            has_db = True
            continue
        if line.startswith("PDF_SOURCE_PATH="):
            updated.append(f"PDF_SOURCE_PATH={TARGET_PDF_PATH}")
            has_pdf = True
            continue
        updated.append(line)

    if not has_db:
        updated.append(f"DATABASE_URL={TARGET_DATABASE_URL}")
    if not has_pdf:
        updated.append(f"PDF_SOURCE_PATH={TARGET_PDF_PATH}")

    env_path.write_text("\n".join(updated).rstrip() + "\n", encoding="utf-8")
    os.environ["DATABASE_URL"] = TARGET_DATABASE_URL
    os.environ["PDF_SOURCE_PATH"] = TARGET_PDF_PATH

    log("ENV configured")
    return parse_db_url(TARGET_DATABASE_URL)


def parse_db_url(database_url: str) -> DbParams:
    parsed = urlparse(database_url)
    if parsed.scheme not in {"postgresql", "postgres"}:
        fail(f"Unsupported DATABASE_URL scheme: {parsed.scheme}")

    if not parsed.hostname:
        fail("DATABASE_URL is missing a hostname")

    host = parsed.hostname
    port = parsed.port or 5432
    user = unquote(parsed.username) if parsed.username else None
    password = unquote(parsed.password) if parsed.password else None
    dbname = parsed.path.lstrip("/") if parsed.path else ""
    if not dbname:
        fail("DATABASE_URL is missing a database name")

    return DbParams(user=user, password=password, host=host, port=port, dbname=dbname)


def validate_pdf_path(path: str) -> None:
    pdf_path = Path(path)
    if not pdf_path.exists():
        fail(
            "PDF path does not exist. Check:\n"
            f"- {TARGET_PDF_PATH}\n"
            f"Current: {pdf_path}"
        )


def get_psycopg2():
    try:
        import psycopg2  # type: ignore
    except Exception as exc:
        fail(
            "psycopg2 is not installed. Install backend dependencies first:\n"
            "- pip install -r requirements.txt\n"
            f"Details: {exc}"
        )
    return psycopg2


def connect(params: DbParams, dbname: str):
    psycopg2 = get_psycopg2()
    try:
        return psycopg2.connect(
            dbname=dbname,
            user=params.user,
            password=params.password,
            host=params.host,
            port=params.port,
        )
    except Exception as exc:
        fail(
            "Database connection failed. Suggested checks:\n"
            "- Is PostgreSQL running? (port 5432)\n"
            "- Does your local auth allow user 'rupayan' to connect?\n"
            "- Is the host reachable? (localhost)\n"
            f"Details: {exc}"
        )


def validate_database_exists(params: DbParams) -> None:
    if params.host not in {"localhost", "127.0.0.1"} or params.port != 5432:
        log(f"WARNING: Expected DB at localhost:5432, got {params.host}:{params.port}")

    maintenance_db = "postgres"
    conn = connect(params, maintenance_db)
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (params.dbname,))
            exists = cur.fetchone() is not None
    finally:
        conn.close()

    if not exists:
        fail(
            "Database 'satyavision' does not exist. Create it, then re-run:\n"
            f"- createdb -h {params.host} -p {params.port} -U {params.user or 'rupayan'} {params.dbname}\n"
            "Or:\n"
            f"- psql -h {params.host} -p {params.port} -U {params.user or 'rupayan'} -c \"CREATE DATABASE {params.dbname};\""
        )

    log("Database connected")


def run_seed_pipeline(backend_dir: Path) -> None:
    validate_pdf_path(os.environ.get("PDF_SOURCE_PATH", TARGET_PDF_PATH))

    result = subprocess.run(
        [sys.executable, "-m", "app.db.seed_data"],
        cwd=str(backend_dir),
        env=os.environ.copy(),
        text=True,
        capture_output=True,
    )

    if result.returncode != 0:
        stderr = (result.stderr or "").strip()
        stdout = (result.stdout or "").strip()
        fail(
            "Seed pipeline failed.\n"
            "Suggested checks:\n"
            f"- PDF path exists: {TARGET_PDF_PATH}\n"
            "- Backend deps installed: pip install -r requirements.txt\n"
            f"stdout: {stdout}\n"
            f"stderr: {stderr}"
        )


def validate_tables_and_data(params: DbParams) -> None:
    conn = connect(params, params.dbname)
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT to_regclass('public.sections') IS NOT NULL")
            has_sections_table = bool(cur.fetchone()[0])
            if not has_sections_table:
                fail("Tables not found after seed. Expected table: sections")
            log("Tables created")

            cur.execute("SELECT COUNT(*) FROM sections")
            sections_count = int(cur.fetchone()[0])
            if sections_count <= 0:
                fail("Seed ran but no data was inserted into sections.")
            log("Seed data inserted")
    finally:
        conn.close()


def main() -> None:
    backend_dir = Path(__file__).resolve().parents[1]

    params = ensure_env_file(backend_dir)
    validate_database_exists(params)
    run_seed_pipeline(backend_dir)
    validate_tables_and_data(params)

    log("Backend ready: uvicorn app.main:app --reload")


if __name__ == "__main__":
    main()
