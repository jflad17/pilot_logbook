from sqlalchemy import (
    Column,
    Integer,
    String,
)
from db.base import Base


class AirlineIdentifier(Base):
    idAirlineIdentifier = Column(Integer, primary_key=True)
    name = Column(String(45), nullable=False)
    letterCode = Column(String(2))
    accountCode = Column(Integer)
