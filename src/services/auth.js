import { api } from './api';

export const loginUser = async (email, senha) => {
    try {
        const response = await api('/api/v1/auth/login', 'POST', { email, senha });
        return response;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

export const logoutUser = async (token) => {
    try {
        const response = await api('/api/v1/auth/logout', 'POST', { token });
        return response;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await api('/api/v1/auth/forgot-password', 'POST', { email });
        return response;
    } catch (error) {
        console.error('Error recovering password:', error);
        throw error;
    }
}

export const verifyCode = async (email, codigo) => {
    try {
        const response = await api('/api/v1/auth/verify-code', 'POST', { email, codigo }); 
        return response;
    } catch (error) {
        console.error('Error verifying code:', error);
        throw error;
    } 
}

export const resetPassword = async (resetToken, novaSenha) => {
    try {
        const response = await api('/api/v1/auth/reset-password', 'POST', { resetToken, novaSenha });
        return response;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}

export const refreshToken = async (refreshToken) => {
    try {
        const response = await api('/api/v1/auth/refresh-token', 'POST', { refreshToken });
        return response;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}