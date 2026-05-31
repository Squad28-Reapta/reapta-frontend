import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sales.css';
import { api } from '../services/api';


const STATUS_LABEL = {
    pendente:  'Pendente',
    concluida: 'Finalizada',
    cancelada: 'Cancelada',
};

const STATUS_CLASS = {
    pendente:  'status-pendente',
    concluida: 'status-concluida',
    cancelada: 'status-cancelada',
};

function formatarData(dataStr) {
    if (!dataStr) return '—';
    return new Date(dataStr).toLocaleDateString('pt-BR');
}

function formatarValor(valor) {
    if (valor == null) return '—';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

export default function Sales() {
    const [vendas, setVendas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        carregarVendas();
    }, []);

    const carregarVendas = async () => {
        setCarregando(true);
        setErro('');
        try {
            const resposta = await api('/api/v1/vendas', 'GET');
            setVendas(resposta.data ?? []);
        } catch (err) {
            setErro('Não foi possível carregar as vendas.');
        } finally {
            setCarregando(false);
        }
    };


    const vendasFiltradas = vendas.filter((v) => {
        const idStr = String(v.id).padStart(6, '0');
        const matchBusca =
            busca === '' ||
            idStr.includes(busca.replace('#', '')) ||
            (v.status ?? '').toLowerCase().includes(busca.toLowerCase());
        const matchStatus =
            filtroStatus === '' || v.status === filtroStatus;
        return matchBusca && matchStatus;
    });


    return (
        <div className="vendas-container">
            <div className="vendas-header">
                <h2 className="vendas-title">Vendas</h2>
                <button
                    className="vendas-btn-nova"
                    onClick={() => navigate('/new-sale')}
                >
                    + Nova Venda
                </button>
            </div>

            <div className="vendas-toolbar">
                <div className="vendas-search-wrapper">
                    <svg className="vendas-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="vendas-search"
                        placeholder="Buscar vendas..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
                <select
                    className="vendas-select"
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                >
                    <option value="">Todos os status</option>
                    <option value="pendente">Pendente</option>
                    <option value="concluida">Finalizada</option>
                    <option value="cancelada">Cancelada</option>
                </select>
            </div>


            {erro && (
                <div className="vendas-erro">
                    <p>{erro}</p>
                    <button onClick={carregarVendas}>Tentar novamente</button>
                </div>
            )}


            {carregando ? (
                <div className="vendas-estado-vazio">
                    <p>Carregando...</p>
                </div>
            ) : !erro && vendasFiltradas.length === 0 ? (
                <div className="vendas-estado-vazio">
                    <p>Nenhuma venda encontrada.</p>
                </div>
            ) : (
                <div className="vendas-lista">
                    {vendasFiltradas.map((venda) => (
                        <div className="venda-row" key={venda.id}>
                            <span className="venda-id">id: #{String(venda.id).padStart(6, '0')}</span>
                            <div className="venda-separador" />
                            <span className="venda-campo">Data: {formatarData(venda.data_venda)}</span>
                            <div className="venda-separador" />
                            <span className="venda-campo">
                                Quantidade de produtos: {venda.quantidade_itens ?? '—'}
                            </span>
                            <div className="venda-separador" />
                            <span className="venda-campo venda-valor">
                                Valor: {formatarValor(venda.valor_total)}
                            </span>
                            <span className={`venda-status ${STATUS_CLASS[venda.status] ?? 'status-pendente'}`}>
                                {STATUS_LABEL[venda.status] ?? venda.status ?? '—'}
                            </span>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
