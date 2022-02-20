// import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

import apiSettings from './settings';
import searchKeyword from './js/api-service';
import getRefs from './js/get-refs';
// import renderSearchResult from './template/gallery';
// import getSearchResult from './js/api-service';
import handlebarTemplate from './template/handlebarTemplate';

const { BASE_URL, API_KEY, image_type } = apiSettings;

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);


 function getSearchResult(q, page = 1, perPage = 20){
  return axios.get(`${BASE_URL}/?key=${API_KEY}&q=${q}&image_type=${image_type}&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
 }; 

function onSearch(event) {
    event.preventDefault();
    console.log('refs.inputEl.value: ' + refs.inputEl.value);
    
    clearInputOnFocus();
    return getSearchResult(refs.inputEl.value)
      .then(checkResponse)
      .catch(onFetchError);
  }


function clearProductList(){
  refs.inputEl.innerHTML = '';
};

function render(response){
  clearProductList();

   if(response.data.hits.length === 0){
    noMatches()
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

  let gallery = new SimpleLightbox('.gallery a', {captionsData: `alt`, captionDelay: 250});
  gallery.on('show.simplelightbox', function () {
    console.log('gallery on '); 
});

gallery.on('error.simplelightbox', function (e) {
console.log(e); 
});
}

refs.galleryEl.addEventListener('click', onImageClick);
