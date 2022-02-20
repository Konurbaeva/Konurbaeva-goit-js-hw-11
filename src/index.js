// import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

import apiSettings from './settings';
import searchKeyword from './js/api-service';
import getRefs from './js/get-refs';
// import renderSearchResult from './template/gallery';
// import getSearchResult from './js/api-service';
import handlebarTemplate from './template/handlebarTemplate';
import simpleLightbox from './js/lightBox';
import PixabayApiService from './js/api-service';

const { BASE_URL, API_KEY, image_type } = apiSettings;
const refs = getRefs();


refs.searchForm.addEventListener('submit', onSearch);

function getSearchResult(q, page = 1, perPage = 20){
   const pixabayUrl = `${BASE_URL}/?key=${API_KEY}&q=${q}&image_type=${image_type}&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
   return axios.get(pixabayUrl);
 };

function onSearch(event) {
    event.preventDefault();
    clearInputOnFocus();

    console.log('refs.inputEl.value: ', refs.inputEl.value);

    return getSearchResult(refs.inputEl.value)
      .then(checkResponse)
      .catch(onFetchError);
  }

function render(response){

   if(response.data.hits.length === 0){
    noMatches();
   } else {
    const markup = handlebarTemplate(response.data.hits);
    totalMatches(response.data.total);
    refs.galleryEl.innerHTML = markup;
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
   }
   }

   function checkResponse(response) {
    console.log('response: ', response);
    render(response);
}

function onFetchError(error) {
    console.error('error: ', error);
   }

  function noMatches() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }  

   function totalMatches(total) {
    Notiflix.Notify.success(`Hooray! We found ${total} images.`)
   }
  
   function clearInputOnFocus(){
   refs.inputEl.addEventListener('focus', (event) => {
    event.target.value = '';    
  }) }


  function onImageClick(event) {
    event.preventDefault();
   // simpleLightbox.open();
 
  }
  
  refs.galleryEl.addEventListener('click', onImageClick); 

