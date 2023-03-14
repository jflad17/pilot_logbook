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
    UniqueConstraint,
)
from sqlalchemy.orm import relationship
from db.base import Base

class Flight(Base):
    id = Column(Integer, primary_key=True)
    date = Column(DATE, nullable=False)
    aircraftIdentity = Column(VARCHAR(9), nullable=False)
    departure = Column(TIME)
    arrival = Column(TIME)
    totalFlightDuration = Column(DECIMAL(6, 2), nullable=False)
    dayLanding = Column(Integer)
    nightLanding = Column(Integer)
    actualInstrument = Column(DECIMAL(6, 2))
    simulatedInstrumentUnderHood = Column(DECIMAL(6, 2))
    atd= Column(DECIMAL(6,2), comment="UND")
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
    crewMemberName = Column(VARCHAR(100))
    flightNumber = Column(VARCHAR(6), nullable=False)
    fileName  = Column(VARCHAR(50))
    timestamp = Column(
        TIMESTAMP,
        nullable=False,
        server_default=func.now()
    )
    to_Airport_id = Column(Integer, ForeignKey("Airport.id"), nullable=False)
    from_Airport_id = Column(Integer, ForeignKey("Airport.id"), nullable=False)
    Aircraft_id = Column(Integer, ForeignKey("Aircraft.id"), nullable=False)
    AircraftCategory_id = Column(
        Integer, ForeignKey("AircraftCategory.id"), nullable=False
    )
    AirlineIdentifier_id = Column(
        Integer, ForeignKey("AirlineIdentifier.id"), nullable=False
    )
    PilotType_id = Column(Integer, ForeignKey("PilotType.id"), nullable=False)
    User_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    __table_args__ = (UniqueConstraint(date, departure, arrival, totalFlightDuration),)

    to_airport = relationship("Airport", foreign_keys=to_Airport_id, lazy="joined")
    from_airport = relationship("Airport", foreign_keys=from_Airport_id, lazy="joined")
    aircraft = relationship("Aircraft", lazy="joined")
    aircraft_category = relationship("AircraftCategory", lazy="joined")
    airline_identifier = relationship("AirlineIdentifier", lazy="joined")
    pilot_type = relationship("PilotType", lazy="joined")
    user = relationship("User", lazy="joined")
