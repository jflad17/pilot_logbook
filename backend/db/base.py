from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class Base:
    __name__: str
    # Generates table name based on class name
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__
