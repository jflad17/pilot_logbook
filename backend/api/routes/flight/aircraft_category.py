from dependencies import get_db
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
import schemas as schemas
import models as models

router = CRUDRouter(
    schema=schemas.AircraftCategory,
    db_model=models.AircraftCategory,
    db=get_db,
    prefix="/aircraft-category",
    tags=["aircraft category"],
    delete_all_route=False,
    get_one_route=False,
)
