from typing import Optional
from .base import Base
from datetime import date, datetime, time
from schemas.airport import Airport
from schemas.aircraft import Aircraft
from schemas.aircraft_category import AircraftCategory
from schemas.pilot_type import PilotType
from schemas.airline_identifier import AirlineIdentifier
from schemas.user import User

class FlightBase(Base):
    date: date
    aircraftIdentity: str
    departure: Optional[time] 
    arrival: Optional[time]
    totalFlightDuration: float
    dayLanding: Optional[int]
    nightLanding: Optional[int]
    actualInstrument: Optional[float]
    simulatedInstrumentUnderHood:  Optional[float]
    atdInstrument: Optional[float]
    hold: Optional[bool]
    fullFlightSim: Optional[float]
    groundTrainer: Optional[float]
    lineCheck: Optional[bool]
    crossCountryTime: Optional[float]
    initialOperatingExperience: bool
    remarks: Optional[str]
    approaches: Optional[int]
    approachType: Optional[str]
    crewMemberName: str
    flightNumber: str
    fileName: Optional[str]
    timestamp: Optional[datetime]
    to_Airport_id: Optional[int]
    from_Airport_id: Optional[int]
    Aircraft_id: int
    AircraftCategory_id: int
    AirlineIdentifier_id: int
    PilotType_id: int
    User_id: int

class Flight(FlightBase):
    id: Optional[int]
    to_airport: Optional[Airport]
    from_airport: Optional[Airport]
    aircraft: Optional[Aircraft]
    airline_identifier:  Optional[AirlineIdentifier]
    aircraft_category:  Optional[AircraftCategory]
    pilot_type:  Optional[PilotType]
    user:  Optional[User]
