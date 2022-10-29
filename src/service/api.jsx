import axios from 'axios';

export async function getImages(searchQuery, page) {
  const API_KEY = '29842257-f781ca2767b35dbb86ba2fb42';
  const QUERY_PARAMS = `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  axios.defaults.baseURL = 'https://pixabay.com/api';

  const { data } = await axios.get(`/${QUERY_PARAMS}`);
  return { data };
}
