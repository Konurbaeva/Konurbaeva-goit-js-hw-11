const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25748459-63f23aee85add1030efa422f3';

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
function searchQuery(q){
 fetch(`${BASE_URL}/api/?key={API_KEY}&q=${q}`)
}

export default {searchQuery};