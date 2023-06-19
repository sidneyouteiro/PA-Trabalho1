from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import List

class CategoriaEnum(str, Enum):
    desktop = 'desktop'
    notebook = 'notebook'
    embarcado = 'embarcado'
    sensor = 'sensor'

class UsuarioSchema(BaseModel):
    usuario_nome: str
    usuario_email: EmailStr

    class Config:
        orm_mode = True

class UsuarioResponse(UsuarioSchema):
    usuario_id: int


class ItemSchema(BaseModel):
    item_nome: str
    categoria: CategoriaEnum
    quantidade_total: int

class CreateItemSchema(ItemSchema):
    detalhes: dict

class UpdateItemSchema(BaseModel):
    item_nome: str | None = None
    categoria: str | None = None
    detalhes: dict | None = None
    quantidade_total: int | None = None

class DeleteItemSchema(BaseModel):
    item_id: int

class ItemResponse(ItemSchema):
    detalhes: str
    
    class Config:
        orm_mode = True


class ListItemResponse(BaseModel):
    itens: List[ItemSchema]

class EmprestimoSchema(BaseModel):
    emprestimo_data: str
    emprestimo_status: str
    emprestimo_quantidade: int
    emprestimo_usuario_id: int
    emprestimo_item_id: int

    class Config:
        orm_mode = True

class UpdateEmprestimoSchema(BaseModel):
    emprestimo_status: str

class ListEmprestimoResponse(BaseModel):
    emprestimos: List[EmprestimoSchema]