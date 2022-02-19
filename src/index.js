// import './sass/main.scss';

import debounce from 'lodash.debounce';
import apiSettings from './settings';
import searchKeyword from './js/api-service';
// import getSearchResult from './js/api-service';
import getRefs from './js/get-refs';

const { BASE_URL, API_KEY } = apiSettings;

//const refs = getRefs();
// refs.searchForm.addEventListener('submit',  debounce(onSearch, DEBOUNCE_DELAY));
//refs.searchForm.addEventListener('submit',  debounce(filterCountriesChange, DEBOUNCE_DELAY));

const inputEl = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('.search-form');
// const button = document.querySelector('button[type="submit"]');

searchForm.addEventListener('submit',  filterChange);

function getSearchResult(q, page = 1){
  return fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`)
  .then((response) => {
    return response.json();
  })
 }; 

function filterChange(event) {
    event.preventDefault();
    
    console.log('inputEl.currentTarget.value: ' + inputEl.value);

    return getSearchResult(inputEl.value)
      .then(checkResponse)
      .catch(onFetchError);
  }

function checkResponse(response) {
    console.log('response: ', response);
}

function onFetchError(error) {
    console.error('error: ', error);
   }