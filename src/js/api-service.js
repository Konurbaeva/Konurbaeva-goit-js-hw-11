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
    this.perPage = 5;
    this.image_type = 'photo';
    this.orientation= 'horizontal';
    this.safesearch = true;
    this.totalPages = 100/  this.perPage;
  }

  fetchArticles() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`
    fetch(url)
      .then(response => response.json())
      .then(data => {

       console.log('DATA: ' , data);
       console.log('this', this);
       console.log('THIS.PAGE: ', this.page);

       if(data.hits.length === 0){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       }  
       if (this.page > 1) {
       refs.loadMoreButton.textContent = "Load more";
      } 
      // add pagination so that this.page === 2 and we can see Load more button
      if (this.page > this.totalPages) {
        return alert('you reached the limit');
      } 

       else {
        const markup = handlebarTemplate(data.hits);
        refs.galleryEl.innerHTML = markup;
       }
       this.incrementPage();
      })
      .catch(err => console.error(err));
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
