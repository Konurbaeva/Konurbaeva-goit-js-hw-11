// // import './sass/main.scss';
// import axios from 'axios';
 import Notiflix from 'notiflix';
// import apiSettings from './settings';
import getRefs from './js/get-refs';
import apiSettings from './settings';
import lightBox from './js/lightBox';

let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

 const refs = getRefs();
 const { BASE_URL, API_KEY } = apiSettings;

 let searchValue = '';
 let page = 1;
 let per_page = 20;
 let totalPages = null;
 let endOfHits = false;

const container = document.querySelector('.container');
const loading = document.querySelector('.loading');

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight });
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		// show the loading animation
		showLoading();
	}
});

refs.searchForm.addEventListener('submit', onSearch);


 function onSearch(event) {
  event.preventDefault();
  clearInputOnFocus();

  searchValue = refs.inputEl.value;

    if (searchValue === '') {
     return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');   
    } else {
     // clearPage();
      getPost();
    }
 }

  function clearInputOnFocus(){
    refs.inputEl.addEventListener('focus', (event) => {
     event.target.value = '';    
   }) }


function showLoading() {
	loading.classList.add('show');
  page += 1;
	
	// load more data
	setTimeout(getPost, 1000)
}

 function totaleEndOfHits() {
    if (page === totalPages) {
      endOfHits = true;
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } 

async function getPost() {

const postResponse = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`);

const postData = await postResponse.json();

    if (postData.hits.length ===0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      addDataToDOM(postData);
    }
}

function clearPage() {

  document.classList.remove('photo-card');
  //page = 1;
//  refs.galleryEl.innerHTML = '';
 //refs.containerEl.innerHTML = '';
}


function addDataToDOM(data) {
	const postElement = document.createElement('div');
	postElement.classList.add('photo-card');


  postElement.innerHTML = data.hits
 .map((result) => {
   return `<div class="photo-card-item">
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

  console.log('================================DATA', data)
  console.log('================================DATA.HITS', data.hits);
  console.log('================================postElement', postElement)

	 container.appendChild(postElement);
	
	loading.classList.remove('show');
}

