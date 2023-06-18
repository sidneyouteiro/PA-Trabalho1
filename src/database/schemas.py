import re
from schema import Schema, And, Use, Optional, SchemaError


def isEmailValid(email):
    regex = re.compile(r"([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])")
    return bool(re.fullmatch(regex, email))

def isDateValid(date):
    regex = r'(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[1,2])/(19|20)\d{2}'
    return bool(re.fullmatch(regex, date))

UsuarioSchema = Schema({
    'nome': And(str,len),
    'email': And(Use(str.lower), lambda x: isEmailValid(x))
})

ItemSchema = Schema({
    'item_nome': And(str,len),
    'categoria': And(str,Use(str.lower), lambda x: x in ('desktop','notebook','embarcado','sensor')),
    'detalhes': And(str,len),
    'quantidade_total': And(Use(int),lambda x: x > 0 )
})

EmprestimoSchema = Schema({
    'emprestimo_data': And(str, lambda x: isDateValid(x)),
    'emprestimo_status': And(str, Use(str.lower), lambda x: x in ('emprestado','devolvido')),
    'emprestimo_quantidade': And(Use(int), lambda x: x > 0 ),
    'emprestimo_usuario_id': And(Use(int), lambda x: x > 0 ),
    'emprestimo_item_id': And(Use(int), lambda x: x > 0 ),
})