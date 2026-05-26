const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, method, body) => {
  const options = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(API_URL + endpoint, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Erro na requisição');
  }

  return await response.json();
};