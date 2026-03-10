import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Busca o elemento raiz do HTML onde a aplicação será montada
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento raiz para montar a aplicação");
}

// Cria a raiz do React e renderiza a aplicação
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* HashRouter é usado para garantir compatibilidade com hospedagens estáticas (como GitHub Pages) */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);