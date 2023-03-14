from .base import Base


class Aircraft(Base):
    id: int
    shortName: str
    name: str
    brand: str | None
    model: str | None
