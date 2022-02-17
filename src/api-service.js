import axios from 'axios';
import settings from './settings';

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
async function searchQuery(q){

// const response = await fetch(`${BASE_URL}/?key={API_KEY}&q=${q}`);

const response = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`);
console.log('request.url: ', response)
const searchResult = response.json()

return searchResult;
}

/* async function getSearchResult() {
    return axios.get(API);
} */

export default { searchQuery };