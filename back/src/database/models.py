from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref
from .db import Base


class ItemInventario(Base):
    __tablename__ = "item_inventario"
    item_id = Column(Integer, primary_key=True)
    item_nome = Column(String)
    categoria = Column(String)
    detalhes = Column(String)
    quantidade_total = Column(Integer)

    def get_dict(self):
        return {
            'item_id': self.item_id,
            'item_nome': self.item_nome,
            'categoria': self.categoria,
            'detalhes': self.detalhes,
            'quantidade_total': self.quantidade_total 
        }
    
class Usuario(Base):
    __tablename__ = 'usuario'
    usuario_id = Column(Integer, primary_key=True)
    usuario_nome = Column(String)
    usuario_email = Column(String)

    def get_dict(self):
        return {
            'usuario_nome': self.usuario_nome,
            'usuario_email': self.usuario_email
        }

class Emprestimo(Base):
    __tablename__ = 'emprestimos'
    emprestimo_id = Column(Integer, primary_key=True)
    emprestimo_data = Column(String)
    emprestimo_status = Column(String)
    emprestimo_quantidade = Column(Integer)
    emprestimo_usuario_id = Column(Integer, ForeignKey("usuario.usuario_id"))
    emprestimo_item_id = Column(Integer, ForeignKey('item_inventario.item_id'))

    dono_temporario = relationship('Usuario', backref="emprest_usuario", foreign_keys=[emprestimo_usuario_id])
    item_emprestado = relationship('ItemInventario', backref='emprest_item', foreign_keys=[emprestimo_item_id])

    def get_dict(self):
        return {
            'emprestimo_id': self.emprestimo_id,
            'emprestimo_data': self.emprestimo_data,
            'emprestimo_status': self.emprestimo_status,
            'emprestimo_quantidade': self.emprestimo_quantidade,
            'emprestimo_usuario_id': self.emprestimo_usuario_id,
            'emprestimo_item_id': self.emprestimo_item_id
        }
