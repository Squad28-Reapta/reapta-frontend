import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import ResetSuccess from './pages/ResetSuccess';
import RotaProtegida from './components/RotaProtegida';
import Sales from './pages/Sales';
import NewSales from './pages/NewSales';
import Products from './pages/Products';
//import NewProduct from './pages/NewProduct';
import Reports from './pages/Reports';
import IntelligentAssistant from './pages/IntelligentAssistant';

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
        <Route path="/sales" element={<RotaProtegida><Layout><Sales /></Layout></RotaProtegida>} />
        <Route path="/new-sale" element={<RotaProtegida><Layout><NewSales /></Layout></RotaProtegida>} />
        <Route path="/products" element={<RotaProtegida><Layout><Products /></Layout></RotaProtegida>} />
        {/* <Route path="/new-product" element={<RotaProtegida><Layout><NewProduct /></Layout></RotaProtegida>} /> */}
        <Route path="/reports" element={<RotaProtegida><Layout><Reports /></Layout></RotaProtegida>} />
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
