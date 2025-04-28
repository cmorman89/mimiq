from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mimiq"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # SQLite configuration
    SQLITE_DB_PATH: str = "db/mimiq.db"
    SQLALCHEMY_DATABASE_URI: str = f"sqlite:///{SQLITE_DB_PATH}"

    # Redis configuration
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 