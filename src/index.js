// import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import apiSettings from './settings';
import getRefs from './js/get-refs';
import ImageApiService from './js/api-service';
import lightBox from './js/lightBox';

 const refs = getRefs();
 const searchApiService = new ImageApiService();
 let lightbox = new SimpleLightbox('.gallery a', { /* options */ });


 refs.searchForm.addEventListener('submit', onSearch);
 refs.loadMoreButton.addEventListener('click', onLoadMore);
 refs.galleryEl.addEventListener('click', onImageClick);

 function onSearch(event){
  event.preventDefault();

  searchApiService.query = refs.inputEl.value;

/*   if (searchApiService.query === '' ) {
    return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');
  } */

  if (searchApiService.query.trim() === '') {
    return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');
  }
  searchApiService.resetPage();
  searchApiService.fetchArticles();
 }


 function onImageClick(event){
   event.preventDefault();

   if(!event.currentTarget.classList.contains('card')) {
     return;
   }

   lightbox.open();
 }

 function onLoadMore(){
   searchApiService.fetchArticles();
 }

 refs.loadMoreButton.addEventListener("click", () => {
  fetchPosts()
    .then((response) => renderPosts(response))
    .catch((error) => console.log(error));
});


 async function fetchPosts() {
  const params = new URLSearchParams({
    page: 1,
    per_page: 5,
  });

  const response = await fetch(`${BASE_URL}/?key=${API_KEY}&q=dog&image_type=photo&orientation=horizontal&safesearch=true&${params}`);
   if (!response.ok) {
     throw new Error(response.status);
   }
   return await response.json();
}

function renderPosts(data) {
  console.log('card was clicked!!')
  console.log('DATA inside renderPosts!!')


  const markup = data.hits
    .map(({webformatURL,likes,views,comments, downloads}) => {
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
 // refs.galleryEl.innerHTML = markup;

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}