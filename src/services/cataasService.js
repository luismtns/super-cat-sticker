import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cataas.com/api',
});

export const fetchCatTags = async () => {
  const response = await api.get('/tags');
  return response.data?.filter((e) => !!e && e.length > 1);
};
