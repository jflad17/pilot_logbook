from sqlalchemy import (
    Column,
    Integer,
    VARCHAR,
    DATE,
    Boolean,
    DECIMAL,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from db.base import Base


class Flight(Base):
    __tablename__ = "flight"
    idFlight = Column(Integer, primary_key=True)
    date = Column(DATE, nullable=False)
    aircraftType = Column(VARCHAR(3), nullable=False)
    aircraftIdentity = Column(VARCHAR(9), nullable=False)
    fromAirport = Column(VARCHAR(3), nullable=False)
    toAirport = Column(VARCHAR(3), nullable=False)
    dayLanding = Column(Integer)
    nightLanding = Column(Integer)
    flightTime = Column(DECIMAL(6, 2), nullable=False)
    nightTime = Column(DECIMAL(6, 2))
    actualInstrument = Column(DECIMAL(6, 2))
    simulatedInstrumentUnderHood = Column(DECIMAL(6, 2))
    hold = Column(Integer)
    simulator = Column(DECIMAL(6, 2))
    crossCountryTime = Column(DECIMAL(6, 2))
    totalFlightDuration = Column(DECIMAL(6, 2), nullable=False)
    initialOperatingExperience = Column(Boolean, nullable=False)
    crewMemberName = Column(VARCHAR(100), nullable=False)
    airlineIdentifier = Column(VARCHAR(2), nullable=False)
    flightNumber = Column(VARCHAR(4), nullable=False)
    AircraftCategory_idAircraftCategory = Column(
        Integer, ForeignKey("aircraftcategory.idAircraftCategory"), nullable=False
    )
    PilotType_idPilotType = Column(Integer, ForeignKey("pilottype.idPilotType"), nullable=False)
    User_idUser = Column(Integer, ForeignKey("user.idUser"), nullable=False)

    aircraft_category = relationship(
        "AircraftCategory", foreign_keys=AircraftCategory_idAircraftCategory, lazy="joined"
    )
    pilot_type = relationship("PilotType", foreign_keys=PilotType_idPilotType, lazy="joined")
    user = relationship("User", foreign_keys=User_idUser, lazy="joined")
