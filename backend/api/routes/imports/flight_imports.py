from dependencies import get_db
from fastapi import APIRouter, Body, Depends, HTTPException, File, UploadFile
from sqlalchemy.sql.expression import select, insert
from sqlalchemy.orm import Session
from db.utils import queryset_to_list
from datetime import datetime
import pandas as pd
import models as models

router = APIRouter(
  prefix='/imports',
  tags=['flight-imports'],
)

@router.post("/skywest/")
def skywest(
    files: list[UploadFile],
    User_id: int = Body(...),
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
            select(models.AirlineIdentifier.id).where(
                models.AirlineIdentifier.name == airline
            )
        ).scalar_one()
        captain_id = db.execute(
            select(models.PilotType.id).where(models.PilotType.shortName == "PIC")
        ).scalar_one()
        first_officer_id = db.execute(
            select(models.PilotType.id).where(models.PilotType.shortName == "SIC")
        ).scalar_one()
        aircraft_category_id = db.execute(
            select(models.AircraftCategory.id).where(
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
                    "AirlineIdentifier_id": airline_identifier_id,
                    "AircraftCategory_id": aircraft_category_id,
                    "PilotType_id": pilot_type_id,
                    "User_id": User_id,
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