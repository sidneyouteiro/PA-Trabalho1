from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.db import get_db
from src.database.models import Emprestimo
from src.database.schemas import UpdateEmprestimoSchema, EmprestimoSchema, ListEmprestimoResponse

router = APIRouter()

@router.get('/', response_model=ListEmprestimoResponse)
def get_all_emprestimos(page: int = 1, limit: int = 15, db: Session = Depends(get_db)):
    skip = (page - 1) * limit
    emprestimos = db.query(Emprestimo).limit(limit).offset(skip).all()
    return { 'emprestimos': emprestimos }

@router.post('/', response_model= EmprestimoSchema)
def create_emprestimo(new_emprestimo: EmprestimoSchema, db: Session = Depends(get_db)):
    db_emprestimo = Emprestimo(**new_emprestimo.dict())
    db.add(db_emprestimo)
    db.commit()
    db.refresh(db_emprestimo)
    return db_emprestimo

@router.put('/{emprestimo_id}')
def update_emprestimo(emprestimo_id: int, updates: UpdateEmprestimoSchema, db: Session = Depends(get_db)):
    emprestimo_query = db.query(Emprestimo).filter(Emprestimo.emprestimo_id == emprestimo_id)
    updated_emprestimo = emprestimo_query.first()
    if not updated_emprestimo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Não foi encontrado emprestimo com o id {emprestimo_id}')
    emprestimo_query.update(updates.dict(exclude_unset=True), synchronize_session=False)
    db.commit()
    return updated_emprestimo

@router.delete('/{emprestimo_id}')
def delete_emprestimo(emprestimo_id: int, db: Session = Depends(get_db)):
    emprestimo_query = db.query(Emprestimo).filter(Emprestimo.emprestimo_id == emprestimo_id)
    emprestimo = emprestimo_query.first()

    if not emprestimo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Não foi encontrado o emprestimo com o id {emprestimo_id}')
    emprestimo_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)