import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';


const { BASE_URL, API_KEY } = apiSettings;

// responseURL: "https://pixabay.com/api/?key=25748459-63f23aee85add1030efa422f3&q=encodeURIComponent(cat)&image_type=photo"

const getSearchResult = (q, page = 1) => {
   // return axios.get(`${BASE_URL}/?key=${API_KEY}&q=encodeURIComponent(${q})&image_type=photo`)

   return axios.get(`${BASE_URL}/?key=${API_KEY}&q=${q}&image_type=photo`)
  }; 

  getSearchResult('cat')
  .then(console.log)
  .catch(console.error);

function searchKeyword(q){

    const response = fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`);
    console.log('request.url: ', response)
    const searchResult = response.json()
    
    return searchResult;
 }

export default { getSearchResult,searchKeyword };