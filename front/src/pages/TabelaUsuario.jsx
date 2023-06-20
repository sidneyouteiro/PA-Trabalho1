import React, { useState } from 'react';

import Tabela from "../components/Tabela";
import Navbar from '../components/Navbar';
import { Modal } from 'react-bootstrap';

const TabelaUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    // por meio de uma requisição HTTP, como por exemplo usando fetch() ou axios.
    // Você pode usar os valores das variáveis nome e email para enviar os dados ao servidor.
  };
  const headers = ["ID", "Nome", "Email"]
  const linhas = [
    [1, "Bubuxo", "bubuxo@bugre.com"],
    [2, "Lobo", "lobo@canideo.com"],
    [3, "Boto", "boto@rio.com"],
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className='row'>
        <div className='col titulo'>
          <h1>Tabela de Usuários</h1>
        </div>
        <div className='col btn-novo'>
          <button className='btn btn-primary' onClick={() => handleShow()}>Novo</button>
        </div>
      </div>
      <div className='card p-3'>
        <Tabela headers={headers} linhas={linhas}></Tabela>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input className="input"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <button className="btn btn-primary"type="submit">Salvar</button>
      </form>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TabelaUsuario;