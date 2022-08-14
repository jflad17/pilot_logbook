from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean
)
from db.base import Base


class PilotType(Base):
    id = Column(Integer, primary_key=True)
    shortName = Column(String(45), nullable=False)
    name = Column(String(45), nullable=False)
    PIC = Column(Boolean, default=False)
