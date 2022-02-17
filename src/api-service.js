const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25748459-63f23aee85add1030efa422f3';

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
async function searchQuery(q){

const response = await fetch(`${BASE_URL}/?key={API_KEY}&q=${q}`);
const searchResult = response.json()

return searchResult;
}

axios.get(BASE_URL)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


export default {searchQuery};