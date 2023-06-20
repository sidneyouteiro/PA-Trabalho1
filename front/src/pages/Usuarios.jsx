import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Usuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    // por meio de uma requisição HTTP, como por exemplo usando fetch() ou axios.
    // Você pode usar os valores das variáveis nome e email para enviar os dados ao servidor.
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className='card p-3'>
      <h1>Tela de Formulário</h1>
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
    </div>
    </div>
  );
};

export default Usuario;
