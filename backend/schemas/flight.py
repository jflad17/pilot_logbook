from .base import Base
from datetime import date
from schemas.aircraft_category import AircraftCategory
from schemas.pilot_type import PilotType


class Flight(Base):
    idFlight: int
    date: date
    aircraftType: str
    aircraftIdentity: str
    fromAirport: str
    toAirport: str
    dayLanding: int
    nightLanding: int
    flightTime: float
    nightTime: float
    actualInstrument: float
    simulatedInstrumentUnderHood: float
    hold: int
    simulator: float
    crossCountryTime: float
    totalFlightDuration: float
    initialOperatingExperience: bool
    crewMemberName: str
    airlineIdentifier: str
    flightNumber: str
    AircraftCategory_idAircraftCategory: int
    PilotType_idPilotType: int

    aircraft_category: AircraftCategory
    pilot_type: PilotType
