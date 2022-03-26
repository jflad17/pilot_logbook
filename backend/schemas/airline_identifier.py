from .base import Base


class AirlineIdentifier(Base):
    idAirlineIdentifier: int
    letterCode: str
    name: str
    accountCode: int
