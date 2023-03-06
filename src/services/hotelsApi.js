import api from './api';

export async function getHotels(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function getHotelsWithRooms(ticketId, token) {
  const response = await api.get(`/hotels/${ ticketId }`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
