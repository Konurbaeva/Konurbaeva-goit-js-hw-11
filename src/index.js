// import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import apiSettings from './settings';
import searchKeyword from './js/api-service';
// import getSearchResult from './js/api-service';
import getRefs from './js/get-refs';
// import renderSearchResult from './template/gallery';
import handlebarTemplate from './template/handlebarTemplate';

const { BASE_URL, API_KEY } = apiSettings;

//const refs = getRefs();

const inputEl = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', onSearch);

 function getSearchResult(q, page = 1){
  return axios.get(`${BASE_URL}/?key=${API_KEY}&q=${q}`)
 }; 


function onSearch(event) {
    event.preventDefault();

    console.log('inputEl.value: ' + inputEl.value);

    return getSearchResult(inputEl.value)
      .then(checkResponse)
      .catch(onFetchError);
  }

function checkResponse(response) {
    console.log('response: ', response);
    render(response);
}

function onFetchError(error) {
  //  console.error('error: ', error);
    Notiflix.Notify.failure('Error occured: ', error);
   }

 const galleryEl = document.querySelector('.gallery');

function render(response){
   if(response.data.hits.length === 0){
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   } else {
    const markup = handlebarTemplate(response.data.hits);
    galleryEl.innerHTML = markup;
   }
   }



  

