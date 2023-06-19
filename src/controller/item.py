from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from src.database.db import get_db
from src.database.models import ItemInventario
from src.database.schemas import ListItemResponse, ItemSchema, UpdateItemSchema, ItemResponse

router = APIRouter()

@router.get('/', response_model = ListItemResponse)
def get_all_itens(page: int = 1, limit: int = 15, db: Session = Depends(get_db)):
    skip = (page - 1) * limit
    itens = db.query(models.ItemInventario).limit(limit).offset(skip).all()
    return { 'itens': itens }

@router.post('/', response_model = ItemResponse)
def create_item(new_item: CreateItemSchema,db: Session = Depends(get_db)):
    db_item = models.ItemInventario(**newItem.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return Response(content=db_item,status_code=status.HTTP_201_CREATED)

@router.put('/{item_id}', response_model = ItemResponse)
def update_item(item_id: int, updates: UpdateItemSchema, db: Session = Depends(get_db)):
    item_query = db.query(ItemInventario).filter(ItemInventario.item_id == item_id)
    updated_item = item_query.first()
    if not updated_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Não foi encontrado item com o id {item_id}')
    item_query.update(updates.dict(exclude_unset=True), synchronize_session=False)
    db.commit()
    return updated_item

@router.delete('/{item_id}')
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item_query = db.query(ItemInventario).filter(ItemInventario.item_id == item_id)
    item = item_query.first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Não foi encontrado item com o id {item_id}')
    item_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)