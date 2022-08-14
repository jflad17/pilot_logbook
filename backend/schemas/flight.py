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
    departure: time | None
    arrival: time | None
    totalFlightDuration: float
    dayLanding: int | None
    nightLanding: int | None
    actualInstrument: float | None
    simulatedInstrumentUnderHood: float | None
    atdInstrument: float | None
    hold: bool | None
    fullFlightSim: float | None
    groundTrainer: float | None
    lineCheck: bool | None
    crossCountryTime: float | None
    initialOperatingExperience: bool | None
    remarks: str | None
    approaches: int | None
    approachType: str | None
    crewMemberName: str
    flightNumber: str
    fileName: str | None
    timestamp: datetime
    AirlineIdentifier_id: int
    AircraftCategory_id: int
    PilotType_id: int
    User_id: int

class Flight(FlightBase):
    id: int | None
    airline_identifier: AirlineIdentifier
    aircraft_category: AircraftCategory
    pilot_type: PilotType
    user: User
