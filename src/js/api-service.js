import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';
import handlebarTemplate from '../template/handlebarTemplate.hbs';
import Notiflix from 'notiflix';
import getRefs from './get-refs';
import lightBox from './lightBox';

let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

const refs = getRefs();

const { BASE_URL, API_KEY } = apiSettings;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 20;
    this.image_type = 'photo';
    this.totalHits = null;
    this.totalPages = null;
    this.endOfHits = false;
  }

/*  fetchResults() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
       this.incrementPage();

       console.log('page increment')
       this.totalHits = data.totalHits;
       console.log('this.totalHits: ', this.totalHits)

       this.totalPages = Math.ceil(this.totalHits /  this.perPage);
       console.log('this.totalPages: ', this.totalPages)
      
       if(data.hits.length === 0){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       } else {
        const markup = handlebarTemplate(data.hits);
        refs.galleryEl.innerHTML = markup;
       }
      });
  } */

  fetchResults() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    return fetch(url)
      .then(response => response.json())
      .then(data => {
       this.incrementPage();
       console.log('this', this)
       console.log('data: ', data)
       console.log('data.hits: ', data.hits)
       return data;
      });
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
}
