import api from './axios.js';

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);