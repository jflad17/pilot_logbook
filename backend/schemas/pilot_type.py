from .base import Base


class PilotType(Base):
    id: int
    shortName: str
    name: str
    PIC: bool
