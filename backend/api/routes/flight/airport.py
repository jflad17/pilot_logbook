import requests
from dependencies import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from db.utils import queryset_to_dict
from datetime import datetime, date
from astral import LocationInfo
from astral.sun import sun
from astral.geocoder import lookup, database, all_locations

router = APIRouter(
    prefix="/airport",
    tags=["airport"],
)


@router.get("/")
def read_airports(db: Session = Depends(get_db)):

    # url = "https://airport-info.p.rapidapi.com/airport/"

    # headers = {
    #     "x-rapidapi-host": "airport-info.p.rapidapi.com",
    #     "x-rapidapi-key": "f9dcb33857msh14d1f285b10a57ap1033e4jsn6bed6a985a08",
    # }

    # response = requests.request("GET", url, headers=headers)
    # return response.text
    l = lookup("Atlanta", database())
    print("Location", l)
    s = sun(l.observer, date=date(2022, 2, 20))
    print(
        (
            f'Dawn:    {s["dawn"]}\n'
            f'Sunrise: {s["sunrise"]}\n'
            f'Noon:    {s["noon"]}\n'
            f'Sunset:  {s["sunset"]}\n'
            f'Dusk:    {s["dusk"]}\n'
        )
    )
