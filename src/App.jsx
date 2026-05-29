import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import ResetSuccess from './pages/ResetSuccesss';
import RotaProtegida from './components/RotaProtegida';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/dashboard" element={
          <RotaProtegida>
            <Layout><Dashboard /></Layout>
          </RotaProtegida>
        } />
        <Route path="/assistant" element={
          <RotaProtegida>
            <Layout><IntelligentAssistant /></Layout>
          </RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
