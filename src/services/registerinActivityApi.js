import api from './api';

export async function RegisterinActivity(body, token) {
  console.log(body)
  const response = await api.post('/activity/', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

