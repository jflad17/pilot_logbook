from sqlalchemy.sql import text
from sqlalchemy.dialects import mysql


def queryset_to_dict(rows):
    return [dict(r) for r in rows]


def queryset_to_list(rows):
    data_list = []
    for r in rows:
        if len(r) == 1:
            if r[0] is not None:
                data_list.append(r[0])
        else:
            data_list.append(list(r))
    return data_list
