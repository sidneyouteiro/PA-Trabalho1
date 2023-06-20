import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Sistema Pombo</h1>
      <div className='card p-3'>
        <h2>Bem-vindo ao sistema</h2>
      </div>
    </div>
  );
};

export default Home;
