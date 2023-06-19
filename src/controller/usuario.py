from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from src.database.models import Usuario
from src.database.schemas import UsuarioSchema, UsuarioResponse
from src.database.db import get_db

router = APIRouter()

@router.post('/', response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def create_user(new_user: UsuarioSchema, db: Session = Depends(get_db)):
    db_user = Usuario(**new_user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete('/{user_id}')
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_query = db.query(Usuario).filter(Usuario.usuario_id == user_id)
    user = user_query.first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Não foi encontrado usuario com o id {user_id}')
    user_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)