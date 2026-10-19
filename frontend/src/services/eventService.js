import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`, getAuthHeader());
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData, getAuthHeader());
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/events/${id}`, eventData, getAuthHeader());
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/events/${id}`, getAuthHeader());
  return response.data;
};