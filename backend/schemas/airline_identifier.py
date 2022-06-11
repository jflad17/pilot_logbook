from .base import Base


class AirlineIdentifier(Base):
    idAirlineIdentifier: int
    letterCode: str | None
    name: str
    accountCode: int | None
