import axios from 'axios';
import apiSettings from '../settings';
import Notiflix from 'notiflix';
import getRefs from './get-refs';


const refs = getRefs();

const { BASE_URL, API_KEY } = apiSettings;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.perPage = 5;
    this.image_type = 'photo';
    this.totalHits = null;
    this.totalPages = null;
    this.endOfHits = false;
  }

  async fetchResults() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    const response = await fetch(url);
    const data = await response.json();
    this.incrementPage();
    console.log('data: ', data);
    console.log('data.hits: ', data.hits);
    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  totaleEndOfHits() {
    if (this.page === this.totalPages) {
      this.endOfHits = true;
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } 

  clearInputOnFocus(){
    refs.inputEl.addEventListener('focus', (event) => {
     event.target.value = '';    
   }) }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get currentPage(){
    return this.page;
  }

  set currentPage(newPage) {
    this.page = newPage;
  }
}