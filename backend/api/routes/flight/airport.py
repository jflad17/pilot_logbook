from dependencies import get_db
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
import schemas as schemas
import models as models

router = CRUDRouter(
    schema=schemas.Airport,
    create_schema=schemas.Airport,
    db_model=models.Airport,
    db=get_db,
    prefix="/airport",
    tags=["airport"],
    delete_all_route=False,
    get_one_route=False,
)
