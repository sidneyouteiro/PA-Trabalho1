import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <a class="navbar-brand">
        <img src='./../public/logo.png' width="30" height="30" alt=""></img>
      </a>
      <Link className="nav-item" to="/tabela-usuario">Usuários</Link>
      <Link className="nav-item" to="/tabela-item">Itens</Link>
      <Link className="nav-item" to="/tabela-emprestimo">Empréstimos</Link>
    </nav>
  );
};

export default Navbar;
