// import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import apiSettings from './settings';
import getRefs from './js/get-refs';
//import ImageApiService from './js/api-service';
import ImageApiService from './js/image-api-service';
import lightBox from './js/lightBox';
import fetchResults from './js/api-service';
import renderPosts from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';

 const refs = getRefs();
 const searchApiService = new ImageApiService();

 let lightbox = new SimpleLightbox('.gallery a', { /* options */ });


 const fetchPostsBtn = document.querySelector(".load-more");
 const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

 refs.searchForm.addEventListener('submit', onSearch);
 loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
 
 function onSearch(e) {
   e.preventDefault();
 
   //searchApiService.query = e.currentTarget.query.value;
   searchApiService.query = refs.inputEl.value;
 
   if (searchApiService.query === '') {
     return alert('cannot be empty');
   }
 
   loadMoreBtn.show();
   searchApiService.resetPage();
   //clearArticlesContainer();
   fetchArticles();
 }
 
 function fetchArticles() {
   loadMoreBtn.disable();
   searchApiService.fetchArticles().then(data => {
    console.log('DATA')
     loadMoreBtn.enable();
   });
 }
 

  
 function clearArticlesContainer() {
   refs.articlesContainer.innerHTML = '';
 }
 