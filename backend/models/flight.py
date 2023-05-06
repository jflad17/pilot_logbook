from sqlalchemy import (
    Column,
    Integer,
    VARCHAR,
    DATE,
    Boolean,
    DECIMAL,
    ForeignKey,
    TIMESTAMP,
    TIME,
    func,
)
from sqlalchemy.orm import relationship

from db.base import Base


class Flight(Base):
    idFlight = Column(Integer, primary_key=True)
    date = Column(DATE, nullable=False)
    aircraftType = Column(VARCHAR(3), nullable=False)
    aircraftIdentity = Column(VARCHAR(9), nullable=False)
    fromAirport = Column(VARCHAR(3), nullable=False)
    toAirport = Column(VARCHAR(3), nullable=False)
    departure = Column(TIME)
    arrival = Column(TIME)
    dayLanding = Column(Integer)
    nightLanding = Column(Integer)
    actualInstrument = Column(DECIMAL(6, 2))
    simulatedInstrumentUnderHood = Column(DECIMAL(6, 2))
    hold = Column(Integer)
    simulator = Column(DECIMAL(6, 2))
    crossCountryTime = Column(DECIMAL(6, 2))
    totalFlightDuration = Column(DECIMAL(6, 2), nullable=False)
    initialOperatingExperience = Column(Boolean)
    crewMemberName = Column(VARCHAR(100), nullable=False)
    flightNumber = Column(VARCHAR(4), nullable=False)
    timestamp = Column(
        TIMESTAMP,
        nullable=False,
        server_default=func.now(),
        default=func.now(),
        onupdate=func.now(),
    )
    AirlineIdentifier_idAirlineIdentifier = Column(
        Integer, ForeignKey("AirlineIdentifier.idAirlineIdentifier"), nullable=False
    )

    AircraftCategory_idAircraftCategory = Column(
        Integer, ForeignKey("AircraftCategory.idAircraftCategory"), nullable=False
    )
    PilotType_idPilotType = Column(Integer, ForeignKey("PilotType.idPilotType"), nullable=False)
    User_idUser = Column(Integer, ForeignKey("User.idUser"), nullable=False)

    airline_identifier = relationship(
        "AirlineIdentifier", foreign_keys=AirlineIdentifier_idAirlineIdentifier, lazy="joined"
    )
    aircraft_category = relationship(
        "AircraftCategory", foreign_keys=AircraftCategory_idAircraftCategory, lazy="joined"
    )
    pilot_type = relationship("PilotType", foreign_keys=PilotType_idPilotType, lazy="joined")
    user = relationship("User", foreign_keys=User_idUser, lazy="joined")
