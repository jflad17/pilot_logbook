from sqlalchemy import (
    Column,
    Integer,
    String,
)
from db.base import Base


class AircraftCategory(Base):
    idAircraftCategory = Column(Integer, primary_key=True)
    shortName = Column(String(45), nullable=False)
    name = Column(String(45), nullable=False)
