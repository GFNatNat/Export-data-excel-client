import axios from 'axios';

const API = axios.create({ baseURL: 'https://export-data-excel-server.onrender.com/api/companies' });

export const fetchCompanies = () => API.get('/');
export const fetchCompany = (id) => API.get(`/${id}`);
export const createCompany = (data) => API.post('/', data);
export const updateCompany = (id, data) => API.put(`/${id}`, data);
export const deleteCompany = (id) => API.delete(`/${id}`);
export const exportCompany = (id) => API.get(`/export/${id}`, { responseType: 'blob' });
export const exportCompaniesByName = (name) => API.get(`/export-company/${encodeURIComponent(name)}`, { responseType: 'blob' });