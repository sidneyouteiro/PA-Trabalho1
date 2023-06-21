import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TabelaItem from './pages/TabelaItem';
import TabelaUsuario from './pages/TabelaUsuario';
import TabelaEmprestimo from './pages/TabelaEmprestimo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TabelaItem></TabelaItem>,
  },
  {
    path: "/tabela-item",
    element: <TabelaItem></TabelaItem>,
  },
  {
    path: "/tabela-usuario",
    element: <TabelaUsuario></TabelaUsuario>,
  },
  {
    path: "/tabela-emprestimo",
    element: <TabelaEmprestimo></TabelaEmprestimo>,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

