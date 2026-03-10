import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite para o projeto React
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Adiciona o plugin oficial da Vite para suporte ao React
});