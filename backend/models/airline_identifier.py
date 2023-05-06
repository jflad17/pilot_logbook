from sqlalchemy import (
    Column,
    Integer,
    String,
)
from sqlalchemy.dialects.mysql import INTEGER
from db.base import Base


class AirlineIdentifier(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(45), nullable=False)
    letterCode = Column(String(2))
    accountCode = Column(String(4))
