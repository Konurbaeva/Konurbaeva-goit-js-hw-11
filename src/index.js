// import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import apiSettings from './settings';
import getRefs from './js/get-refs';
import ImageApiService from './js/api-service';
import lightBox from './js/lightBox';

 const searchApiService = new ImageApiService();
 let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

 const refs = getRefs();

 refs.searchForm.addEventListener('submit', onSearch);

 function onSearch(event){
  event.preventDefault();
  searchApiService.clearInputOnFocus();

  searchApiService.query = refs.inputEl.value;
  if (searchApiService.query === '') {
    return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');
  }

  searchApiService.resetPage();
  searchApiService.fetchResults().then(appendMarkup)
 }

function appendMarkup(results){
 renderList(results.hits)
}

function renderList(results) {
  const markup = results
    .map((result) => {
      return `<div class="photo-card">
      <a href="${result.webformatURL}" target="_blank" rel="noopener noreferrer">
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
  refs.galleryEl.innerHTML = markup;
}



