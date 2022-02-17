// import './sass/main.scss';

import debounce from 'lodash.debounce';
import apiSettings from './settings';
import getSearchResult from './js/gallery-api';
import getRefs from './js/get-refs';

const { BASE_URL, API_KEY } = apiSettings;

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');


form.addEventListener('input',  debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(e){
    e.preventDefault();
    console.log('search...', searchInput.value);

    BASE_URL.getSearchResult(searchInput.value)
    .then(checkResponse)
    .catch(onFetchError);
}

function checkResponse(response) {
    console.log('response: ', response);
}

function onFetchError(error) {
    console.error('error: ', error);
   }

/*   getSearchResult('cat')
  .then(response => response.json())
  .catch(console.error); */

  console.log('handleSearch: ' + typeof handleSearch);
  console.log('settings: ' + apiSettings.BASE_URL);
  console.log('window.location.href: ' + window.location.href);

  