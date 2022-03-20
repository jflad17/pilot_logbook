import os
from pydantic import AnyHttpUrl, BaseSettings, validator


class Settings(BaseSettings):
    DEV = True
    SERVER = False
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = ["http://127.0.0.1:9000", "http://127.0.0.1:3000"]

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str] | str:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    PROJECT_NAME: str = "LogbookAPI"
    PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))

    MYSQL_SERVER: str = ""
    MYSQL_USER: str = ""
    MYSQL_PASSWORD: str = ""
    MYSQL_DB: str = ""

    SQLALCHEMY_POOLSIZE: int = 2
    SQLALCHEMY_DATABASE_URI: str = (
        f"mysql+mysqldb://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_SERVER}/{MYSQL_DB}"
    )

    class Config:
        case_sensitive = True


settings = Settings()
