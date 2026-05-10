import api from './api';

// Get all trips for logged in user
export const getTrips = async () => {
  const res = await api.get('/trips');
  return res.data;
};

// Get single trip
export const getTripById = async (id) => {
  const res = await api.get(`/trips/${id}`);
  return res.data;
};

// Create a trip
export const createTrip = async (tripData) => {
  const res = await api.post('/trips', tripData);
  return res.data;
};

// Update a trip
export const updateTrip = async (id, tripData) => {
  const res = await api.put(`/trips/${id}`, tripData);
  return res.data;
};

// Delete a trip
export const deleteTrip = async (id) => {
  const res = await api.delete(`/trips/${id}`);
  return res.data;
};

// Get budget summary
export const getTripBudget = async (id) => {
  const res = await api.get(`/trips/${id}/budget`);
  return res.data;
};
