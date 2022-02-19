// import './sass/main.scss';
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
  return fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`)
  .then((response) => {
    return response.json();
  })
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
    console.error('error: ', error);
   }

 const galleryEl = document.querySelector('.gallery');

  function render(response){
    const markup = handlebarTemplate(response.hits);
    galleryEl.innerHTML = markup;
   }



  

