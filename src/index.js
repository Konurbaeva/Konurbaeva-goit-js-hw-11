// // import './sass/main.scss';
 import Notiflix from 'notiflix';
import getRefs from './js/get-refs';
import apiSettings from './settings';
import lightBox from './js/lightBox';


 const refs = getRefs();
 const { BASE_URL, API_KEY } = apiSettings;

 let searchValue = '';
 let page = 1;
 let per_page = 5;
 let totalPages = null;
 let endOfHits = false;

const container = document.querySelector('.container');
const loading = document.querySelector('.loading');

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		showLoading();
	}
});

refs.searchForm.addEventListener('submit', onSearch);
refs.galleryEl.addEventListener('click', onImageClick);


let lightbox = new SimpleLightbox('.gallery a',   {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  enableKeyboard: true,
});

function onImageClick(evt) {
  evt.preventDefault();
  if(!evt.currentTarget.classList.contains('card')) {
      return;
  }
  lightbox.open();
};


 function onSearch(event) {
  event.preventDefault();
  clearInputOnFocus();

  searchValue = refs.inputEl.value;

    if (searchValue === '') {
     return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');   
    } else {
      clearPage();
      getData();
    }
 }

  function clearInputOnFocus(){
    refs.inputEl.addEventListener('focus', (event) => {
     event.target.value = '';    
   }) }


function showLoading() {
	loading.classList.add('show');
  page += 1;

  if (page === totalPages) {
    endOfHits = true;
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }

	setTimeout(getData, 1000)
}

async function getData() {

const postResponse = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`);

const postData = await postResponse.json();

    if (postData.hits.length ===0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      addDataToDOM(postData);
    }
}

function clearPage() {
  page = 1;

 const photoCardElements = document.getElementsByClassName('photo-card');
 console.log('photoCardElements.length: ',photoCardElements.length);
 if (photoCardElements.length > 0) {
  for (var i = photoCardElements.length - 1; i >= 0; --i) {
    photoCardElements[i].remove();
  }
 } 
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
       <b>Likes ${result.likes}</b>
     </p>
     <p class="info-item">
       <b>Views ${result.views}</b>
     </p>
     <p class="info-item">
       <b>Comments${result.comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads${result.downloads}</b>
     </p>
   </div>
 </div>`;
 })
 .join(""); 

	container.appendChild(postElement);
	loading.classList.remove('show');
}

//document.documentElement.scrollTop = 0;

window.scrollTo(0, 0);