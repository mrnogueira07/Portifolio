/**
 * @file firebase.ts
 * @description Módulo de Inicialização e Configuração do Firebase SDK.
 * 
 * Este arquivo contém as credenciais e inicializa os serviços do Firebase
 * como App e Analytics para o portfólio de Matheus Nogueira.
 */

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuração do aplicativo Firebase obtida no console oficial do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD95v0PXUr7TA3_jMNbVR1hLSMQ3AdgIWA",
  authDomain: "portifolio-matheus-nogueira.firebaseapp.com",
  projectId: "portifolio-matheus-nogueira",
  storageBucket: "portifolio-matheus-nogueira.firebasestorage.app",
  messagingSenderId: "851294647965",
  appId: "1:851294647965:web:dcf05fcdc80010e98b4674",
  measurementId: "G-4RPSDJG5HV"
};

// Inicialização da instância principal da aplicação Firebase
export const app = initializeApp(firebaseConfig);

// Instância do banco de dados Firestore para salvar formulários de contato e mensagens
export const db = getFirestore(app);

// Inicialização segura do Analytics (apenas em ambientes de navegador suportados)
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics não suportado no ambiente atual
  });
}
