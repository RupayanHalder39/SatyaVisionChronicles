from sqlalchemy.orm import Query


def paginate(query: Query, offset: int, limit: int):
    total = query.count()
    items = query.offset(offset).limit(limit).all()
    return items, total
