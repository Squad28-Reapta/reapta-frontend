import React, { useState } from 'react';
import '../styles/ModalCliente.css';
import { criarCliente, atualizarCliente } from '../services/customers.js';

export default function ModalNovoCliente({ cliente, onClose, onSucesso }) {
  const editando = Boolean(cliente);

  const [form, setForm] = useState({
    nome: cliente?.nome ?? '',
    cpf_cnpj: cliente?.cpf_cnpj ?? '',
    endereco: cliente?.endereco ?? '',
    telefone: cliente?.telefone ?? '',
    email: cliente?.email ?? '',
    ie: cliente?.ie ?? '',
    site: cliente?.site ?? '',
    instagram: cliente?.instagram ?? '',
  });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (!form.nome || !form.cpf_cnpj || !form.endereco || !form.telefone || !form.email) {
      setErro('Preencha nome, CPF/CNPJ, endereço, telefone e e-mail.');
      return;
    }

    setSalvando(true);
    try {
      if (editando) {
        await atualizarCliente(cliente.id, form);
      } else {
        await criarCliente(form);
      }
      onSucesso?.();
      onClose?.();
    } catch (e) {
      setErro(e.message || 'Não foi possível salvar o cliente.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editando ? 'Editar Cliente' : 'Novo Cliente'}</h3>
          <button className="modal-fechar" onClick={onClose} aria-label="Fechar">×</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Nome *
            <input name="nome" value={form.nome} onChange={handleChange} />
          </label>

          <label>
            CPF / CNPJ *
            <input name="cpf_cnpj" value={form.cpf_cnpj} onChange={handleChange} />
          </label>

          <label>
            Endereço *
            <input name="endereco" value={form.endereco} onChange={handleChange} />
          </label>

          <div className="modal-linha">
            <label>
              Telefone *
              <input name="telefone" value={form.telefone} onChange={handleChange} />
            </label>
            <label>
              E-mail *
              <input name="email" type="email" value={form.email} onChange={handleChange} />
            </label>
          </div>

          <div className="modal-linha">
            <label>
              Inscrição Estadual
              <input name="ie" value={form.ie} onChange={handleChange} />
            </label>
            <label>
              Site
              <input name="site" value={form.site} onChange={handleChange} />
            </label>
          </div>

          <label>
            Instagram
            <input name="instagram" value={form.instagram} onChange={handleChange} />
          </label>

          {erro && <p className="modal-erro">{erro}</p>}

          <div className="modal-acoes">
            <button type="button" className="modal-btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-btn-salvar" disabled={salvando}>
              {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
