import axios from 'axios';
import { pixabay } from 'pixabay';
import apiSettings from '../settings';
import Notiflix from 'notiflix';
import getRefs from './get-refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const refs = getRefs();
let gallery = new SimpleLightbox('.gallery a');

refs.galleryEl.addEventListener('click', onImageClick);

async function onImageClick(){
  gallery.on('show.simplelightbox', function () {
	// do something…
  console.log('happy case');
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); // some usefull information
});
}


const { BASE_URL, API_KEY } = apiSettings;

  async function fetchResults() {

    const response = await axios.get(
      `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${per_page}`
    ).then(data => {
       if(response.data.hits.length === 0){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       }  
       if (page > 1) {
       refs.loadMoreButton.textContent = "Load more";
      } 
  
      if (page > totalPages) {
        console.log('you reached the limit')
      } 
       else {
        renderPosts(data);
       }
       page += 1;

      })
      .catch(err => console.error(err));
  }

  async function renderPosts(data) {
    const markup = data.hits
      .map(({ webformatURL, likes, views,comments,downloads}) => {
        return `
        <div class="flex-container">
         <div class="photo-card-item">
         <a href="${webformatURL}" target="_blank" rel="noopener noreferrer">
         <img src="${webformatURL}" alt="" loading="lazy" />
         </a>
         <div class="info">
             <b>Likes </b>${likes}
             <b>Views </b>${views}
             <b>Comments </b>${comments}
             <b>Downloads </b>${downloads}
         </div>
       </div></div>
        `;
      })
      .join("");
      refs.galleryEl.insertAdjacentHTML("beforeend", markup);
  }

  export default { fetchResults, renderPosts };