import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';


const { BASE_URL, API_KEY } = apiSettings;


function searchKeyword(q){

    const response = fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}`);
    const searchResult = response.json()
    
    return searchResult;
 }

export default { searchKeyword };