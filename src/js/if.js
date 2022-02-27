import InfiniteScroll from 'infinite-scroll';
import ImageApiService from './api-service';
import apiSettings from '../settings';
import getRefs from './get-refs';

console.log('InfiniteScroll ', InfiniteScroll)

const { BASE_URL, API_KEY } = apiSettings;
const refs = getRefs();

// refs.inputEl.value

let infScroll = new InfiniteScroll( '.container', {
    // options
    responseType: 'text',
    path: function() {
       let pageNumber = this.loadCount + 1;
       // return `/page=${pageNumber}`; 

       return `${BASE_URL}/?key=${API_KEY}&q=${refs.inputEl.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}`; 
      }
  });

  infScroll.on('load', (response, path) => {
    console.log('JSON from infScroll' , JSON.parse(response));

  });

/* const markup = results.hits
.map((result) => {
  return `<div class="photo-card">
  <a href="${result.largeImageURL}" target="_blank" rel="noopener noreferrer">
  <img src="${result.webformatURL}" alt="" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>${result.likes}</b>
    </p>
    <p class="info-item">
      <b>${result.views}</b>
    </p>
    <p class="info-item">
      <b>${result.comments}</b>
    </p>
    <p class="info-item">
      <b>${result.downloads}</b>
    </p>
  </div>
</div>`;
})
.join(""); 

const fragment = new DocumentFragment();
const d = document.createElement('div');
fragment.innerHTML = markup;
console.log(fragment);
*/