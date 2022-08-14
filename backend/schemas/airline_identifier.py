from .base import Base


class AirlineIdentifier(Base):
    id: int
    letterCode: str | None
    name: str
    accountCode: int | None
