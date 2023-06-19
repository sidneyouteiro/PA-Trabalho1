import json

class DatabaseData():
    def __init__(self, item_nome, categoria, quantidade_total, detalhes):
        self.item_nome = item_nome
        self.categoria = categoria
        self.quantidade_total = quantidade_total
        self.detalhes = detalhes

class DatabaseEncoder(DatabaseData):
    def __init__(self, item_nome, categoria, quantidade_total, detalhes):
        super().__init__(item_nome, categoria, quantidade_total, detalhes)
    
    def encode(self):
        return {
            'item_nome': self.item_nome,
            'categoria': self.categoria,
            'detalhes': json.dumps(self.detalhes),
            'quantidade_total': self.quantidade_total
        }

class DatabaseDecoder(DatabaseData):
    def __init__(self, item_id, item_nome, categoria, quantidade_total, detalhes):
        super().__init__(item_nome, categoria, quantidade_total, detalhes)
        self.item_id

    def decode(self):
        return {
            'item_id': self.item_id,
            'item_nome': self.item_nome,
            'categoria': self.categoria,
            'detalhes': json.loads(self.detalhes),
            'quantidade_total': self.quantidade_total
        }