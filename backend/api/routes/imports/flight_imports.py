from dependencies import get_db
from fastapi import APIRouter, Body, Depends, HTTPException, File, UploadFile
from sqlalchemy.sql.expression import select, insert
from sqlalchemy.orm import Session
from db.utils import queryset_to_list, queryset_to_dict
from datetime import datetime
import pandas as pd
import models as models

router = APIRouter(
  prefix='/imports',
  tags=['flight-imports'],
)

# Look at remarks for student, add to crewmembername if Student:
# Look at Instructor, add to crewmembername if exists
@router.post("/und/")
async def und(
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
    pilot_types = queryset_to_list(db.execute("SELECT id, shortName FROM PilotType"))
    aircraft_categories = queryset_to_list(db.execute("SELECT id, shortName FROM AircraftCategory"))
    for f in files:
        #file = f.file
        #fs = await f.read()
        filename = f.filename
        if filename in file_list:
            message_list.append([f'{filename} already exists!', 'warning'])
            continue
        elif f.spool_max_size <= 0:
            message_list.append([f'{filename} was empty, file not imported.', 'warning'])
            continue
        else:
            csv_reader = pd.read_csv(f.file, na_filter=False)
            airline_identifier_id = db.execute(
                select(models.AirlineIdentifier.id).where(
                    models.AirlineIdentifier.name == airline
                )
            ).scalar_one()

            data_list = []
            flight_airport_list = []
            to_airport_list = []
            for i, row in csv_reader.iterrows():
                
                from_Airport_id = None
                to_Airport_id = None
                pilot_type = None
                aircraft_category = None
                aircraft_id = None
                aircraft_category_id = None

                fromAirport = row["from"]
                toAirport = row["to"]
                sel = row["SEL"]
                mel = row["MEL"]
                dual_given = row["DUALGIVEN"]
                dual_received = row["DUALRCVD"]
                solo = row["SOLO"]
                oral = row["oral"]
                pic = row["PIC"]
                sic = row["SIC"]
                aircraft_type = row["acModel"]

                if sel:
                    aircraft_category = "SEL"
                elif mel:
                    aircraft_category = "MEL"

                if dual_given:
                    pilot_type = "DUALGIVEN"
                elif dual_received:
                    pilot_type = "DUALRCVD"
                elif solo:
                    pilot_type = "SOLO"
                elif oral:
                    pilot_type = "ORAL"
                elif pic:
                    pilot_type = "PIC"
                elif sic:
                    pilot_type = "SIC"
                else:
                    pilot_type = "GROUND TRAINER"
                pilot_type_id = [x[0] for x in pilot_types if x[1] == pilot_type][0]
                if aircraft_category:
                    aircraft_category_id = [x[0] for x in aircraft_categories if x[1] == aircraft_category][0]
                if fromAirport:
                    if fromAirport in [x[1] for x in airport_list]:
                        from_Airport_id = [x[0] for x in airport_list if x[1] == fromAirport][0]
                    else:
                        result = db.execute(insert(models.Airport).values(code=fromAirport))
                        from_Airport_id = result.lastrowid
                        airport_list.append((from_Airport_id, fromAirport))
                        message_list.append([fromAirport + " was added to Airport table!", "success"])
                if toAirport:
                    for to in toAirport.split('-'):
                        if to in [x[1] for x in airport_list]:
                            to_Airport_id = [x[0] for x in airport_list if x[1] == to][0]
                        else:
                            result = db.execute(insert(models.Airport).values(code=to))
                            to_Airport_id = result.lastrowid
                            airport_list.append((to_Airport_id, to))
                            message_list.append([to + " was added to Airport table!", "success"])
                        to_airport_list.append(
                            {
                                'date': datetime.strptime(row["date"], "%m/%d/%Y").date(),
                                'pilotType': pilot_type_id,
                                'tail': row["tail"],
                                'course': row["course"],
                                'lesson': row["lesson"],
                                'status': row["status"],
                                'from': from_Airport_id,
                                'to': to_Airport_id
                            }
                        )
                
                if aircraft_type:
                    for id, shortName in aircraft_ids:
                        if shortName == aircraft_type:
                            aircraft_id = id
                    if not aircraft_id:
                        result = db.execute(insert(models.Aircraft).values(shortName=aircraft_type))
                        aircraft_id = result.lastrowid
                        aircraft_ids.append((aircraft_id, aircraft_type))
                        message_list.append([aircraft_type + " was added to Aircraft table!", 'success'])

                data_list.append(
                    {
                        "date": datetime.strptime(row["date"], "%m/%d/%Y").strftime("%Y-%m-%d"),
                        "Aircraft_id": aircraft_id,
                        "aircraftIdentity": row["tail"],
                        "from_Airport_id": from_Airport_id,
                        "course": row["course"],
                        "lesson": row["lesson"],
                        "status": row["status"],
                        "remarks": row["remarks"],
                        "crewMemberName": row["crewMemberName"],
                        "oral": oral,
                        "approaches": row["approaches"],
                        "dtl": row["dtl"],
                        "ntl": row["ntl"],
                        "instructor": row["instructor"],
                        "crossCountryTime": row["crossCountryTime"],
                        "dayLanding": row["dayLanding"],
                        "nightLanding": row["nightLanding"],
                        "actualInstrument": row["actualInstrument"],
                        "simulatedInstrumentUnderHood": row["simulatedInstrumentUnderhood"],
                        "atdInstrument": row["atdInstrument"],
                        "atd": row["atd"],
                        "totalFlightDuration": row["totalFlightDuration"],
                        "fileName": filename,
                        #"to_Airport_id": to_Airport_id,
                        "AircraftCategory_id": aircraft_category_id,
                        "AirlineIdentifier_id": airline_identifier_id,
                        "PilotType_id": pilot_type_id,
                        "User_id": User_id,
                    }
                )
            #print(data_list)
            last_flight_id = None
            if data_list:
                try:
                    db.execute(insert(models.Flight).values(data_list))
                    # last_flight_id = result.lastrowid
                    db.commit()
                    flight_list = queryset_to_dict(db.execute("SELECT id, date, PilotType_id, aircraftIdentity, course, lesson, status, from_airport_id FROM Flight"))
                    for t in to_airport_list:
                        #print('TTTTTTTTTT', t)
                        for flight in flight_list:
                            #print('FFFFFFFFF', f)
                            if t['date'] == flight['date'] and t['pilotType'] == flight['PilotType_id'] and t['tail'] == flight['aircraftIdentity'] and t['course'] == flight['course'] and t['lesson'] == flight['lesson'] and t['status'] == flight['status'] and t['from'] == flight['from_airport_id']:
                                flight_airport_list.append({"Flight_id": flight['id'], "Airport_id": t['to']})
                                break
                            else:
                                continue
                        #break
                    message_list.append([filename + " Uploaded Successfully!", 'success'])
                except Exception as err:
                    db.rollback()
                    message_list.append([filename + " Failed Uploading!", 'error'])
                    raise HTTPException(422, err)
            print('FLIGHT AIRPORT LIST', flight_airport_list)
            if flight_airport_list:
                try:
                    db.execute(insert(models.Flight_Airport).values(flight_airport_list))
                    db.commit()
                    message_list.append(['Added to destination table Successfully!', 'success'])
                except Exception as err:
                    db.rollback()
                    message_list.append(['Failed adding to destination table!', 'error'])
                    raise HTTPException(422, err)
    # else:
    #     message_list.append([f'{file.filename} was empty, file not imported.', 'warning'])
    return message_list

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
            print(data_list)
            try:
                db.execute(insert(models.Flight).values(data_list).prefix_with('IGNORE'))
                db.commit()
                message_list.append([file.filename + " Uploaded Successfully!", 'success'])
            except Exception as err:
                db.rollback()
                message_list.append([file.filename + " Failed Uploading!", 'error'])
                raise HTTPException(422, err)
        else:
            message_list.append([f'{file.filename} was empty, file not imported.', 'warning'])
    return message_list


@router.post("/delta/")
def delta(
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