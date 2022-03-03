import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';
import Notiflix from 'notiflix';
import getRefs from './get-refs';
//import renderPosts from '../js/api-service';

const refs = getRefs();

const { BASE_URL, API_KEY } = apiSettings;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 20;
    this.image_type = 'photo';
    this.orientation= 'horizontal';
    this.safesearch = true;
    this.totalPages = 100/  this.perPage;
  }

  async fetchArticles() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
       if(data.hits.length === 0){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       }  
     
      if (this.page > this.totalPages) {
        Notiflix.Notify.failure('you reached the limit');
      } 
      
       else {
          const markup = data.hits
            .map(({ webformatURL, likes, views,comments,downloads}) => {
              return `
              <div class="flex-container">
               <div class="photo-card-item">
               <a href="${webformatURL}" target="_blank" rel="noopener noreferrer">
               <img src="${webformatURL}" alt="" loading="lazy" />
               </a>
               <div class="info">
                   <b>Likes </b>${likes}
                   <b>Views </b>${views}
                   <b>Comments </b>${comments}
                   <b>Downloads </b>${downloads}
               </div>
             </div></div>
              `;
            })
            .join("");
            refs.galleryEl.insertAdjacentHTML("beforeend", markup);
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