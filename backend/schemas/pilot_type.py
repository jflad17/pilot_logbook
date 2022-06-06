from .base import Base


class PilotType(Base):
    idPilotType: int
    shortName: str
    name: str
    PIC: bool
