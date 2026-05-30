import React, { useState, useRef, useEffect } from 'react';
import '../styles/IntelligentAssistant.css';
import { api } from '../services/api';

const SUGESTOES_RAPIDAS = [
  { categoria: 'Vendas',     texto: 'Qual foi o produto mais vendido este mês?' },
  { categoria: 'Estoque',    texto: 'Quais produtos estão com estoque crítico?' },
  { categoria: 'Financeiro', texto: 'Mostre o lucro dos últimos 6 meses' },
];

const MENSAGEM_INICIAL = {
  id: 0,
  origem: 'assistente',
  texto: 'Olá! Sou o Assistente Inteligente da Reapta. Posso responder perguntas sobre vendas, estoque e produtos com base nos dados do sistema. Como posso ajudar?',
  timestamp: new Date(),
};

export default function AssistenteInteligente() {
  const [mensagens, setMensagens] = useState([MENSAGEM_INICIAL]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);


  const idRef = useRef(1);
  const fimDaListaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fimDaListaRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, carregando]);

  const formatarHora = (date) =>
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const enviarPergunta = async (pergunta) => {
    const textoPergunta = pergunta || input.trim();
    if (!textoPergunta || carregando) return;

    setInput('');

    const novaMensagemUsuario = {
      id: idRef.current++,
      origem: 'usuario',
      texto: textoPergunta,
      timestamp: new Date(),
    };
    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setCarregando(true);

    try {
      const resposta = await api('/api/v1/ia/consulta', 'POST', {
        pergunta: textoPergunta,
      });

      const novaMensagemIA = {
        id: idRef.current++,
        origem: 'assistente',
        texto: resposta.data?.resposta || 'Não consegui encontrar uma resposta para isso.',
        dados: resposta.data?.dados || null,
        timestamp: new Date(),
      };
      setMensagens((prev) => [...prev, novaMensagemIA]);
    } catch {
      setMensagens((prev) => [...prev, {
        id: idRef.current++,
        origem: 'assistente',
        texto: 'Não consegui processar sua pergunta no momento. Por favor, tente novamente ou consulte a seção de Relatórios.',
        timestamp: new Date(),
        status: 'erro',
      }]);
    } finally {
      setCarregando(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarPergunta();
    }
  };

  const limparConversa = () => {
    setMensagens([MENSAGEM_INICIAL]);
  };

  const conversaVazia = mensagens.every((m) => m.origem === 'assistente' && m.id === 0);

  return (
    <div className="assistente-container">

      <div className="assistente-header">
        <div className="assistente-header-info">
          <h2 className="assistente-title">Assistente Inteligente</h2>
        </div>
        <button
          className="btn-limpar"
          onClick={limparConversa}
          disabled={conversaVazia}
        >
          Nova conversa
        </button>
      </div>

      <div className="assistente-chat">
        <p className="assistente-input-label">Sua pergunta</p>

        <div className="assistente-input-area">
          <textarea
            ref={inputRef}
            className="assistente-input"
            placeholder="Pergunte algo sobre vendas ou produtos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={carregando}
          />
          <button
            className="btn-enviar"
            onClick={() => enviarPergunta()}
            disabled={!input.trim() || carregando}
            title="Enviar pergunta (Enter)"
          >
            {carregando ? (
              <span className="btn-enviando">...</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            )}
          </button>
        </div>

        <div className="chat-lista">
          {mensagens.map((msg) => (
            <div
              key={msg.id}
              className={`mensagem-wrapper ${msg.origem === 'usuario' ? 'wrapper-usuario' : 'wrapper-assistente'}`}
            >
              <div className={`mensagem ${msg.origem === 'usuario' ? 'mensagem-usuario' : 'mensagem-assistente'} ${msg.status === 'erro' ? 'mensagem-erro' : ''}`}>
                <p className="mensagem-texto">{msg.texto}</p>

                {msg.dados && Array.isArray(msg.dados) && msg.dados.length > 0 && (
                  <div className="mensagem-dados">
                    <table className="dados-tabela">
                      <thead>
                        <tr>
                          {Object.keys(msg.dados[0]).map((col) => (
                            <th key={col}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.dados.map((linha, i) => (
                          <tr key={i}>
                            {Object.values(linha).map((val, j) => (
                              <td key={j}>{String(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <span className="mensagem-hora">{formatarHora(msg.timestamp)}</span>
              </div>
            </div>
          ))}

          {carregando && (
            <div className="mensagem-wrapper wrapper-assistente">
              <div className="mensagem mensagem-assistente mensagem-carregando">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}

          <div ref={fimDaListaRef} />
        </div>
      </div>

      {conversaVazia && !carregando && (
        <div className="sugestoes-container">
          <p className="sugestoes-label">Sugestões para começar</p>
          <div className="sugestoes-lista">
            {SUGESTOES_RAPIDAS.map((s, i) => (
              <button key={i} className="sugestao-chip" onClick={() => enviarPergunta(s.texto)}>
                <span className="sugestao-chip-categoria">{s.categoria}</span>
                <p className="sugestao-chip-texto">{s.texto}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}
