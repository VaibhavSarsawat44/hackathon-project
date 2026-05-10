import api from './api';

// Get all notes for a trip
export const getNotes = async (tripId, stopId = null) => {
  const url = stopId ? `/notes/${tripId}?stopId=${stopId}` : `/notes/${tripId}`;
  const res = await api.get(url);
  return res.data;
};

// Create a note
export const createNote = async (noteData) => {
  const res = await api.post('/notes', noteData);
  return res.data;
};

// Update a note
export const updateNote = async (id, data) => {
  const res = await api.put(`/notes/${id}`, data);
  return res.data;
};

// Delete a note
export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
