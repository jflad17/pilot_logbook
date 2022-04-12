from dependencies import get_db
from fastapi.datastructures import UploadFile
from fastapi.params import File
from fastapi import Depends, HTTPException
from sqlalchemy.sql.expression import select, insert
from sqlalchemy.orm import Session
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
from datetime import datetime
import pandas as pd
import schemas as schemas
import models as models

router = CRUDRouter(
    schema=schemas.Flight,
    db_model=models.Flight,
    db=get_db,
    prefix="/flight",
    tags=["flight"],
    delete_all_route=False,
)


@router.post("/import", response_model=schemas.Flight)
def skywest_import_flight(
    airline: str, name: str, files: list[UploadFile] = list[File(...)], db: Session = Depends(get_db)
):
    for file in files:
        csv_reader = pd.read_csv(file.file)
        airline_identifier_id = db.execute(
            select(models.AirlineIdentifier.idAirlineIdentifier).where(
                models.AirlineIdentifier.name == airline
            )
        ).scalar_one()
        captain_id = db.execute(
            select(models.PilotType.idPilotType).where(models.PilotType.shortName == "PIC")
        ).scalar_one()
        first_officer_id = db.execute(
            select(models.PilotType.idPilotType).where(models.PilotType.shortName == "SIC")
        ).scalar_one()
        aircraft_category_id = db.execute(
            select(models.AircraftCategory.idAircraftCategory).where(
                models.AircraftCategory.shortName == "MEL"
            )
        ).scalar_one()

        data_list = []
        for i, row in csv_reader.iterrows():
            block = row["Block"]
            hours, minutes = block.split(":")
            hours = int(hours) + round((int(minutes) / 60), 4)
            captain = row["Captain"]
            first_officer = row["First Officer"]
            crewMemberName = captain
            pilot_type_id = captain_id
            if name in captain:
                crewMemberName = first_officer
                pilot_type_id = first_officer_id
            data_list.append(
                {
                    "date": datetime.strptime(row["Date"], "%m/%d/%Y").strftime("%Y-%m-%d"),
                    "flightNumber": str(row["Flight"]).strip("*"),
                    "aircraftType": row["A/C Type"],
                    "aircraftIdentity": row["Tail"],
                    "fromAirport": row["Origin"],
                    "toAirport": row["Dest"],
                    "departure": row["Depart"],
                    "arrival": row["Arrive"],
                    "totalFlightDuration": hours,
                    "crewMemberName": crewMemberName,
                    "PilotType_idPilotType": pilot_type_id,
                    "AircraftCategory_idAircraftCategory": aircraft_category_id,
                    "AirlineIdentifier_idAirlineIdentifier": airline_identifier_id,
                    "User_idUser": 2,
                }
            )
        try:
            db.execute(insert(models.Flight).values(data_list))
            db.commit()
        except Exception as err:
            print(err)
            db.rollback()
            raise HTTPException(422, err)
