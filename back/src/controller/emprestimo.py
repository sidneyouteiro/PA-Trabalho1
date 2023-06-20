from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from src.database.db import get_db
from src.database.models import Emprestimo
from src.database.schemas import UpdateEmprestimoSchema, EmprestimoSchema, ListEmprestimoResponse, EmprestimoResponse

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK)
def get_all_emprestimos(page: int = 1, limit: int = 15, db: Session = Depends(get_db)):
    skip = (page - 1) * limit
    emprestimos = db.query(Emprestimo).limit(limit).offset(skip).all()

    emprestimos_response = []
    for emprestimo in emprestimos:
        emprestimos_response.append(emprestimo.get_dict())

    print(emprestimos_response)
    return { 'emprestimos': emprestimos_response }

@router.post('/',status_code=status.HTTP_201_CREATED)
def create_emprestimo(new_emprestimo: EmprestimoSchema, db: Session = Depends(get_db)):
    print(new_emprestimo.dict())
    db_emprestimo = Emprestimo(**new_emprestimo.dict())
    db.add(db_emprestimo)
    db.commit()
    db.refresh(db_emprestimo)
    aux = {
        'emprestimo_id': db_emprestimo.emprestimo_id,
        'emprestimo_data': db_emprestimo.emprestimo_data,
        'emprestimo_status': db_emprestimo.emprestimo_status,
        'emprestimo_quantidade': db_emprestimo.emprestimo_quantidade,
        'emprestimo_usuario_id': db_emprestimo.emprestimo_usuario_id,
        'emprestimo_item_id': db_emprestimo.emprestimo_item_id
    }
    return aux

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