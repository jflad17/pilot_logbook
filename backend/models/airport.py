from sqlalchemy import (
    Column,
    Integer,
    String,
)
from db.base import Base


class Airport(Base):
    id = Column(Integer, primary_key=True)
    code = Column(String(3), nullable=False)
    name = Column(String(100))
    city = Column(String(50))
    state = Column(String(4))
