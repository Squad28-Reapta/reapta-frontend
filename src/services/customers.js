import { api } from './api.js';

const ENDPOINT = '/api/v1/clientes';

/**
 * Busca todos os clientes. Aceita filtro opcional por nome ou CPF/CNPJ.
 * @param {string} [busca] - Texto para filtrar por nome ou CPF/CNPJ
 * @returns {Promise<Array>} Lista de clientes
 */
export async function getClientes(busca = '') {
  const query = busca ? `?busca=${encodeURIComponent(busca)}` : '';
  const dados = await api(`${ENDPOINT}${query}`);
  return dados.data;
}

/**
 * Busca um cliente pelo ID.
 * @param {string|number} id
 * @returns {Promise<Object>} Cliente encontrado
 */
export async function getClientePorId(id) {
  const dados = await api(`${ENDPOINT}/${id}`);
  return dados.data;
}

/**
 * Cria um novo cliente.
 * @param {Object} cliente - Dados do cliente
 * @param {string} cliente.nome
 * @param {string} cliente.cpf_cnpj
 * @param {string} cliente.endereco
 * @param {string} cliente.telefone
 * @param {string} cliente.email
 * @param {string} [cliente.ie]
 * @param {string} [cliente.site]
 * @param {string} [cliente.instagram]
 * @returns {Promise<Object>} Cliente criado
 */
export async function criarCliente(cliente) {
  const dados = await api(ENDPOINT, 'POST', cliente);
  return dados.data;
}

/**
 * Atualiza um cliente existente (PUT completo).
 * @param {string|number} id
 * @param {Object} cliente - Dados atualizados do cliente
 * @returns {Promise<Object>} Cliente atualizado
 */
export async function atualizarCliente(id, cliente) {
  const dados = await api(`${ENDPOINT}/${id}`, 'PUT', cliente);
  return dados.data;
}

/**
 * Remove um cliente permanentemente.
 * @param {string|number} id
 * @returns {Promise<Object>} Confirmação da remoção
 */
export async function deletarCliente(id) {
  const dados = await api(`${ENDPOINT}/${id}`, 'DELETE');
  return dados;
}