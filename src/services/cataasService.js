import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cataas.com/api',
});

export const fetchCatTags = async () => {
  const response = await api.get('/tags');
  return response.data?.filter((e) => !!e && e.length > 1);
};

export const getImageURL = ({ say, tag, fontSize, fontColor, timestamp }) => {
  const baseURL = 'https://cataas.com/cat';
  return (
    baseURL +
    (tag ? `/${tag}` : '') +
    (say ? `/says/${encodeURIComponent(say)}` : '') +
    `?fontSize=${encodeURIComponent(fontSize)}&fontColor=${encodeURIComponent(fontColor)}&timestamp=${timestamp}`
  );
};
