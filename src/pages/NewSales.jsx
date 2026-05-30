import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewSales() {
  const navigate = useNavigate();

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #e5e4e7',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#08060d',
    outline: 'none',
    boxSizing: 'border-box',
    marginTop: '6px'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div>
        <h2 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Lançar Nova Venda</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Insira os dados da transação efetuada</p>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e4e7', maxWidth: '800px' }}>
        <form onSubmit={(e) => { e.preventDefault(); alert('Venda registrada com sucesso!'); navigate('/sales'); }}>
          
          {/* Grid Linha 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Produto Adquirido</label>
              <select style={inputStyle} required>
                <option value="">Selecione o produto no catálogo...</option>
                <option value="1">Dispositivo IoT Reapta Node - R$ 890,00</option>
                <option value="2">Módulo de Sensor de Presença - R$ 145,00</option>
                <option value="3">Licença Anual Reapta Dash - R$ 1.590,00</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Quantidade</label>
              <input type="number" min="1" defaultValue="1" style={inputStyle} required />
            </div>
          </div>

          {/* Grid Linha 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={labelStyle}>Nome do Cliente</label>
              <input type="text" placeholder="Nome completo ou Empresa" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Forma de Recebimento</label>
              <select style={inputStyle} required>
                <option value="pix">Pix</option>
                <option value="credito">Cartão de Crédito</option>
                <option value="boleto">Boleto Bancário</option>
              </select>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid #e5e4e7', margin: '25px 0' }} />

          {/* Botões de Comando */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button 
              type="button" 
              onClick={() => navigate('/sales')}
              style={{ backgroundColor: '#fff', color: '#666', border: '1px solid #e5e4e7', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
            >
              Salvar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
