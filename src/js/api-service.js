import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';


const { BASE_URL, API_KEY } = apiSettings;

/*   function getSearchResult(q, page = 1){
  return fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`)
  .then((response) => {
    return response.json();
  })
 };  */
 


function searchKeyword(q){

    const response = fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`);
    const searchResult = response.json()
    
    return searchResult;
 }

export default { searchKeyword };