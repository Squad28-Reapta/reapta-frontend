import { api } from './api';


export const getProducts = async (filtros = {}) => {
    try {
        const params = new URLSearchParams(filtros).toString();
        const url = params ? `/api/v1/produtos?${params}` : '/api/v1/produtos';
        const response = await api(url, 'GET');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const postProducts = async (productData) => {
    try {
        const response = await api('/api/v1/produtos', 'POST', productData);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar produto: ', error);
        throw error;
    }
}

export const updateProduct = async (id, productData) => {
    try {
        const response = await api('/api/v1/produtos/' + id, 'PUT', productData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await api('/api/v1/produtos/' + id, 'DELETE');
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
}