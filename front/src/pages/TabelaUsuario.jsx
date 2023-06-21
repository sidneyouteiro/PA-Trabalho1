import React, { useState, useEffect } from 'react';

import Tabela from "../components/Tabela";
import Navbar from '../components/Navbar';
import { Modal } from 'react-bootstrap';

const TabelaUsuario = () => {
  const [linhas, setLinhas] = useState([])
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const headers = ["ID", "Nome", "Email"]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/usuario');
      const json = await response.json();
      setLinhas(json['usuarios'].map(obj => {
        return Object.values(obj).map(value => {
          if (typeof value !== 'object') {
            return value;
          }
          return null;
        });
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "usuario_nome": nome,
        "usuario_email": email
      })
    };
    fetch('http://localhost:8000/usuario', requestOptions)
      .then(response => response.json())
      .then(() => {
        handleClose()
        fetchData()
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <div className="form-group">
              <label>
                Nome&nbsp;
                <input className="input"
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Email&nbsp;
                <input className="input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
            </div>
            <br />
            <button className="btn btn-primary" type="submit">Salvar</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TabelaUsuario;