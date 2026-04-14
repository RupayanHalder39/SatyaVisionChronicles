from pydantic import BaseModel


class Pagination(BaseModel):
    total: int
    limit: int
    offset: int


class PaginatedResponse(BaseModel):
    pagination: Pagination
