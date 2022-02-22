// import './sass/main.scss';
import handlebarTemplate from './template/handlebarTemplate';
import axios from 'axios';
import Notiflix from 'notiflix';
import apiSettings from './settings';
import getRefs from './js/get-refs';
import ImageApiService from './js/api-service';


 const searchApiService = new ImageApiService();
 
 const refs = getRefs();

 refs.searchForm.addEventListener('submit', onSearch);
 refs.loadMoreButton.addEventListener('click', onLoadMore);

 function onSearch(event){
  event.preventDefault();
  searchApiService.clearInputOnFocus();

  searchApiService.query = refs.inputEl.value;
  if (searchApiService.query === '') {
    return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');
  }

  searchApiService.resetPage();
  searchApiService.fetchResults();
 }

 function onLoadMore(){
   searchApiService.fetchResults();
 }

