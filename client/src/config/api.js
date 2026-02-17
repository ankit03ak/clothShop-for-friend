// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fr-api-s2ue.onrender.com/api';

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  
  ADMIN: `${API_BASE_URL}/admin`,
  ADMIN_USERS_COUNT: `${API_BASE_URL}/admin/users/count`,
  ADMIN_USERS_LIST: `${API_BASE_URL}/admin/users/list`,
};

export default API_BASE_URL;
