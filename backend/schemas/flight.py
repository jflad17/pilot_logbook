from typing import Optional
from .base import Base
from datetime import date, datetime, time
from schemas.aircraft_category import AircraftCategory
from schemas.pilot_type import PilotType
from schemas.airline_identifier import AirlineIdentifier
from schemas.user import User

class FlightBase(Base):
    date: date
    aircraftType: str
    aircraftIdentity: str
    fromAirport: str
    toAirport: str
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
    AirlineIdentifier_id: int
    AircraftCategory_id: int
    PilotType_id: int
    User_id: int

class Flight(FlightBase):
    id: Optional[int]
    airline_identifier:  Optional[AirlineIdentifier]
    aircraft_category:  Optional[AircraftCategory]
    pilot_type:  Optional[PilotType]
    user:  Optional[User]
