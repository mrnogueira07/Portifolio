/**
 * @file index.tsx
 * @description Ponto de Entrada Principal (Entry Point) da aplicação React com Vite.
 * 
 * Monta o aplicativo na árvore DOM utilizando o ReactDOM e encapsula a aplicação
 * no HashRouter para suporte completo a SPAs.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './src/App';
import './index.css';

// Busca o elemento raiz HTML onde o React será montado
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento #root no DOM.");
}

// Cria a raiz do React 18 e renderiza a aplicação
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);