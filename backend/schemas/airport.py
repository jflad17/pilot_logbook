from .base import Base

class Airport(Base):
    id: int
    code: str
    name: str | None
    city: str | None
    state: str | None
