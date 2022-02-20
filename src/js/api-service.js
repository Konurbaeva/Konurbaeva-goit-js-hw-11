import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';


const { BASE_URL, API_KEY } = apiSettings;

/* const options = {
  headers: {
    Authorization: API_KEY,
  },
}; */

export default class PixabayApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.perPage = 20;
  }

  fetchArticles(query) {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=${image_type}&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    return fetch(url)
      .then(response => response.json())
      .then(({ articles }) => {
       this.incrementPage();
        return articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.query;
  }

  set query(newQuery) {
    this.query = newQuery;
  }
}
