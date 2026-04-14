from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=False)

    app_name: str = "SatyaVisionChronicles"
    api_prefix: str = "/api/v1"
    # Keep defaults credential-free; real deployments should always supply DATABASE_URL via environment.
    database_url: str = "postgresql://rupayan@localhost:5432/satyavision"
    pdf_source_path: str = "/Users/rupayan/SatyaVisionChroniclesDesign/IEDC Book 2.pdf"
    static_dir: str = "./app/static"
    cors_origins: str = "http://localhost:5173"


settings = Settings()
