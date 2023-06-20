from pydantic import BaseModel
from enum import Enum
from typing import List

class CategoriaEnum(str, Enum):
    desktop = 'desktop'
    notebook = 'notebook'
    embarcado = 'embarcado'
    sensor = 'sensor'

class UsuarioSchema(BaseModel):
    usuario_nome: str
    usuario_email: str

    class Config:
        orm_mode = True

class UsuarioResponse(UsuarioSchema):
    usuario_id: int


class ItemSchema(BaseModel):
    item_nome: str
    categoria: str
    quantidade_total: int

class CreateItemSchema(ItemSchema):
    detalhes: dict

class UpdateItemSchema(BaseModel):
    item_nome: str | None = None
    detalhes: dict | None = None
    quantidade_total: int | None = None

class DeleteItemSchema(BaseModel):
    item_id: int

class ItemResponse(ItemSchema):
    detalhes: dict
    item_id: int
    
    class Config:
        orm_mode = True


class ListItemResponse(BaseModel):
    itens: List[ItemResponse]

class EmprestimoSchema(BaseModel):
    emprestimo_data: str
    emprestimo_status: str
    emprestimo_quantidade: int
    emprestimo_usuario_id: int
    emprestimo_item_id: int

    class Config:
        orm_mode = True

class EmprestimoResponse(EmprestimoSchema):
    emprestimo_item_id: int

class UpdateEmprestimoSchema(BaseModel):
    emprestimo_status: str

class ListEmprestimoResponse(BaseModel):
    emprestimos: List[EmprestimoSchema]