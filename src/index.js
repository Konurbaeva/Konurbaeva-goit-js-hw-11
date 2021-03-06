// import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import apiSettings from './settings';
import getRefs from './js/get-refs';
//import ImageApiService from './js/api-service';
import ImageApiService from './js/image-api-service';

import fetchResults from './js/api-service';
import renderPosts from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';


 const refs = getRefs();
 const searchApiService = new ImageApiService();

 

 const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

 refs.searchForm.addEventListener('submit', onSearch);
 loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

 function onSearch(e) {
   e.preventDefault();
 
   searchApiService.query = refs.inputEl.value;
 
   if (searchApiService.query === '') {
    return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');
  }
 
   loadMoreBtn.show();
   searchApiService.resetPage();
   
   clearArticlesContainer();
   clearInputOnFocus();

   fetchArticles();
 }
 
 function fetchArticles() {
   loadMoreBtn.disable();
   searchApiService.fetchArticles().then(data => {
     loadMoreBtn.enable();
   });
 }

 function clearArticlesContainer() {
  refs.galleryEl.innerHTML = '';
 }
 
 function clearInputOnFocus(){
  refs.inputEl.addEventListener('focus', (event) => {
   event.target.value = '';    
 }) }