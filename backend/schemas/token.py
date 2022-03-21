from .base import Base


class TokenData(Base):
    username: str | None = None
    scopes: list[str] = []


class Token(Base):
    access_token: str
    token_type: str
