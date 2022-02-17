import axios from 'axios';
import apiSettings from '../settings';

const { BASE_URL, API_KEY } = apiSettings;

export const getSearchResult = (q, page = 1) => {
    return axios.get(`${BASE_URL}/?key=${API_KEY}&q=encodeURIComponent(${q})&image_type=photo`)
  }; 