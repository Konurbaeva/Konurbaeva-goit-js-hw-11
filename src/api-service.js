import axios from 'axios';
import settings from './settings';


async function searchQuery(q){

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
// const response = await fetch(`${BASE_URL}/?key={API_KEY}&q=${q}`);

const response = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`);
console.log('request.url: ', response)
const searchResult = response.json()

return searchResult;
}

export default { searchQuery };