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
    airport_list = queryset_to_list(db.execute("SELECT id, code FROM Airport"))
    file_list = queryset_to_list(db.execute('SELECT DISTINCT fileName FROM Flight'))
    aircraft_ids = db.execute(
        select(models.Aircraft.id, models.Aircraft.shortName)
    ).all()

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

        data_list = []
        for i, row in csv_reader.iterrows():
            from_Airport_id = None
            to_Airport_id = None
            fromAirport = row["Origin"]
            toAirport = row["Dest"]
            if toAirport in [x[1] for x in airport_list]:
                to_Airport_id = [x[0] for x in airport_list if x[1] == toAirport][0]
            else:
                result = db.execute(insert(models.Airport).values(code=toAirport))
                to_Airport_id = result.lastrowid
                airport_list.append((to_Airport_id, toAirport))
                message_list.append([toAirport + " was added to Airport table!", "success"])
            if fromAirport in [x[1] for x in airport_list]:
                from_Airport_id = [x[0] for x in airport_list if x[1] == fromAirport][0]
            else:
                result = db.execute(insert(models.Airport).values(code=fromAirport))
                from_Airport_id = result.lastrowid
                airport_list.append((from_Airport_id, fromAirport))
                message_list.append([fromAirport + " was added to Airport table!", "success"])
            block = row["Block"]
            hours, minutes = block.split(":")
            hours = int(hours) + round((int(minutes) / 60), 4)
            captain = row["Captain"]
            first_officer = row["First Officer"]
            crewMemberName = first_officer
            pilot_type_id = first_officer_id
            if name in captain:
                crewMemberName = captain
                pilot_type_id = captain_id
            aircraft_type = row["A/C Type"]
            aircraft_id = None
            for id, shortName in aircraft_ids:
                if shortName == aircraft_type:
                    aircraft_id = id
            if not aircraft_id:
                result = db.execute(insert(models.Aircraft).values(shortName=aircraft_type))
                aircraft_id = result.lastrowid
                aircraft_ids.append((aircraft_id, aircraft_type))
                message_list.append([aircraft_type + " was added to Aircraft table!", 'success'])

            flightNumber = f"DL{str(row['Flight']).strip('*')}"
            data_list.append(
                {
                    "date": datetime.strptime(row["Date"], "%m/%d/%Y").strftime("%Y-%m-%d"),
                    "aircraftIdentity": row["Tail"],
                    "departure": row["Depart"],
                    "arrival": row["Arrive"],
                    "totalFlightDuration": hours,
                    "crewMemberName": crewMemberName,
                    "flightNumber": flightNumber,
                    "fileName": file.filename,
                    "to_Airport_id": to_Airport_id,
                    "from_Airport_id": from_Airport_id,
                    "Aircraft_id": aircraft_id,
                    "AircraftCategory_id": aircraft_category_id,
                    "AirlineIdentifier_id": airline_identifier_id,
                    "PilotType_id": pilot_type_id,
                    "User_id": User_id,
                }
            )
        if data_list:
            try:
                db.execute(insert(models.Flight, ).values(data_list).prefix_with('IGNORE'))
                db.commit()
                message_list.append([file.filename + " Uploaded Successfully!", 'success'])
            except Exception as err:
                db.rollback()
                message_list.append([file.filename + " Failed Uploading!", 'error'])
                raise HTTPException(422, err)
        else:
            message_list.append([f'{file.filename} was empty, file not imported.', 'warning'])
    return message_list
