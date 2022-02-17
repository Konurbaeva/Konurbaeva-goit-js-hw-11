// import './sass/main.scss';

import debounce from 'lodash.debounce';
import apiSettings from './settings';
import searchQuery from './js/api-service';
import getRefs from './js/get-refs';

const { BASE_URL, API_KEY } = apiSettings;

const DEBOUNCE_DELAY = 300;
const refs = getRefs();


// form.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));
// refs.searchForm.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));
refs.inputEl.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e){

/*     const form = e.currentTarget;
    const searchQuery = form.elements.query.value; */
    e.preventDefault();
    const searchQuery = refs.inputEl.value;

    
    console.log('search...', searchQuery);

    searchQuery(searchQuery)
    .then(checkResponse)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function checkResponse(response) {
    console.log('response: ', response.json());
}

function onFetchError(error) {
    console.error('error: ', error);
   }


  