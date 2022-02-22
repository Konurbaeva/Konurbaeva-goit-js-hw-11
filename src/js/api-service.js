import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';
import handlebarTemplate from '../template/handlebarTemplate.hbs';
import Notiflix from 'notiflix';
import getRefs from './get-refs';

const refs = getRefs();

const { BASE_URL, API_KEY } = apiSettings;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 20;
    this.image_type = 'photo';
  }

  fetchArticles() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
       this.incrementPage();
       console.log('DATA: ' , data);
       console.log('this', this);

       if(data.hits.length === 0){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       } else {
        const markup = handlebarTemplate(data.hits);
        refs.galleryEl.innerHTML = markup;
       }
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
