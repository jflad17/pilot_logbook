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
    id = Column(Integer, primary_key=True)
    date = Column(DATE, nullable=False)
    aircraftType = Column(VARCHAR(10), nullable=False)
    aircraftIdentity = Column(VARCHAR(9), nullable=False)
    fromAirport = Column(VARCHAR(3), nullable=False)
    toAirport = Column(VARCHAR(3), nullable=False)
    departure = Column(TIME)
    arrival = Column(TIME)
    totalFlightDuration = Column(DECIMAL(6, 2), nullable=False)
    dayLanding = Column(Integer)
    nightLanding = Column(Integer)
    actualInstrument = Column(DECIMAL(6, 2))
    simulatedInstrumentUnderHood = Column(DECIMAL(6, 2))
    atdInstrument = Column(DECIMAL(6,2), comment="UND")
    hold = Column(Boolean, default=False, nullable=False)
    fullFlightSim = Column(DECIMAL(6, 2))
    groundTrainer = Column(DECIMAL(6, 2))
    lineCheck = Column(Boolean, default=False, nullable=False)
    crossCountryTime = Column(DECIMAL(6, 2))
    initialOperatingExperience = Column(Boolean, default=False, nullable=False)
    remarks = Column(VARCHAR(255))
    approaches = Column(Integer)
    approachType = Column(VARCHAR(255))
    crewMemberName = Column(VARCHAR(100), nullable=False)
    flightNumber = Column(VARCHAR(4), nullable=False)
    fileName  = Column(VARCHAR(50))
    timestamp = Column(
        TIMESTAMP,
        nullable=False,
        server_default=func.now()
    )
    AirlineIdentifier_id = Column(
        Integer, ForeignKey("AirlineIdentifier.id"), nullable=False
    )

    AircraftCategory_id = Column(
        Integer, ForeignKey("AircraftCategory.id"), nullable=False
    )
    PilotType_id = Column(Integer, ForeignKey("PilotType.id"), nullable=False)
    User_id = Column(Integer, ForeignKey("User.id"), nullable=False)

    airline_identifier = relationship(
        "AirlineIdentifier", foreign_keys=AirlineIdentifier_id, lazy="joined"
    )
    aircraft_category = relationship(
        "AircraftCategory", foreign_keys=AircraftCategory_id, lazy="joined"
    )
    pilot_type = relationship("PilotType", foreign_keys=PilotType_id, lazy="joined")
    user = relationship("User", foreign_keys=User_id, lazy="joined")
