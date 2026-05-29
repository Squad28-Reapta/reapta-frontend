import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import ResetSuccess from './pages/ResetSuccesss';
import RotaProtegida from './components/RotaProtegida';

// Importação das novas telas do projeto Reapta
import Produtos from './pages/Produtos';
import Vendas from './pages/Vendas';
import NovasVendas from './pages/NovasVendas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        
        {/* Rota do Dashboard Existente */}
        <Route path="/dashboard" element={
          <RotaProtegida>
            <Layout><Dashboard /></Layout>
          </RotaProtegida>
        } />

        {/* Novas Rotas solicitadas integradas ao Layout global */}
        <Route path="/produtos" element={
          <RotaProtegida>
            <Layout><Produtos /></Layout>
          </RotaProtegida>
        } />

        <Route path="/vendas" element={
          <RotaProtegida>
            <Layout><Vendas /></Layout>
          </RotaProtegida>
        } />

        <Route path="/novas-vendas" element={
          <RotaProtegida>
            <Layout><NovasVendas /></Layout>
          </RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;