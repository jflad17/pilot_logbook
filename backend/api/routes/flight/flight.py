from dependencies import get_db
from fastapi import Body, Depends, HTTPException, File, UploadFile
from sqlalchemy.sql.expression import select, insert
from sqlalchemy.orm import Session
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
from db.utils import queryset_to_list
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

#  = list[File(...)]
@router.post("/skywest-import/")
def skywest_import_flight(
    files: list[UploadFile] = list[File(...)],
    airline: str = Body(...),
    name: str = Body(...), db: Session = Depends(get_db)
):
    message_list = []
    file_list = queryset_to_list(db.execute('SELECT DISTINCT fileName FROM Flight'))
    for file in files:
        if file.filename in file_list:
            message_list.append([f'{file.filename} already exists!', 'warning'])
            continue
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
            aircraft_type = row["A/C Type"]
            if row["A/C Type"] == 'ER7':
                aircraft_type = 'ERJ-170'
            data_list.append(
                {
                    "date": datetime.strptime(row["Date"], "%m/%d/%Y").strftime("%Y-%m-%d"),
                    "aircraftType": aircraft_type,
                    "aircraftIdentity": row["Tail"],
                    "fromAirport": row["Origin"],
                    "toAirport": row["Dest"],
                    "departure": row["Depart"],
                    "arrival": row["Arrive"],
                    "totalFlightDuration": hours,
                    "crewMemberName": crewMemberName,
                    "flightNumber": str(row["Flight"]).strip("*"),
                    "fileName": file.filename,
                    "AirlineIdentifier_idAirlineIdentifier": airline_identifier_id,
                    "AircraftCategory_idAircraftCategory": aircraft_category_id,
                    "PilotType_idPilotType": pilot_type_id,
                    "User_idUser": 1,
                }
            )
        if data_list:
            try:
                db.execute(insert(models.Flight).values(data_list))
                db.commit()
                message_list.append([file.filename + " Uploaded Successfully!", 'success'])
            except Exception as err:
                db.rollback()
                message_list.append([file.filename + " Failed Uploading!", 'error'])
                raise HTTPException(422, err)
        else:
            message_list.append([f'{file.filename} was empty, file not imported.', 'warning'])
    return message_list
