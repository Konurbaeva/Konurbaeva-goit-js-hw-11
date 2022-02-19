// import './sass/main.scss';

import debounce from 'lodash.debounce';
import apiSettings from './settings';
import searchKeyword from './js/api-service';
import getRefs from './js/get-refs';

const { BASE_URL, API_KEY } = apiSettings;

const DEBOUNCE_DELAY = 300;
const refs = getRefs();


// form.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));
// refs.searchForm.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));


// refs.inputEl.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));

refs.inputEl.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e){

    e.preventDefault();
    const searchQuery = refs.inputEl.value;

    searchKeyword('cat')
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


  