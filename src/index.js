// import './sass/main.scss';

import apiSettings from './settings';
//import getSearchResult from './js/pixabay-api';
import getSearchResult from './js/pixabay-api';

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');


form.addEventListener('submit', handleSearch);

function handleSearch(e){
    e.preventDefault();
    console.log('search...', searchInput.value);
}

  getSearchResult('cat')
  .then(response => response.json())
  .catch(console.error);


  console.log('settings: ' + apiSettings.BASE_URL);
  console.log('window.location.href: ' + window.location.href);

  