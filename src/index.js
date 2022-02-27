// // import './sass/main.scss';
// import axios from 'axios';
// import Notiflix from 'notiflix';
// import apiSettings from './settings';
import getRefs from './js/get-refs';
// import ImageApiService from './js/api-service';
// import lightBox from './js/lightBox';
//import InfiniteScroll from './js/if';

//  const searchApiService = new ImageApiService();
//  let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

 const refs = getRefs();
//  const { BASE_URL, API_KEY } = apiSettings;

//  refs.searchForm.addEventListener('submit', onSearch);

//  function onSearch(event){
//   event.preventDefault();
//   searchApiService.clearInputOnFocus();

//   searchApiService.query = refs.inputEl.value;
//   if (searchApiService.query === '') {
//     return  Notiflix.Notify.warning('Cannot be empty. Please provide your searching word!');
//   }

//   searchApiService.resetPage();
//   searchApiService.fetchResults().then(appendMarkup)
//  }

// function appendMarkup(results){
//  //renderList(results.hits)
//  console.log('appendMarkup results: ', results);
//  renderList(results)
// }

// function renderList(results) {
//   console.log('results: ', results)
//   console.log('results.hits: ', results.hits)

//   const markup = results.hits
//     .map((result) => {
//       return `<div class="photo-card">
//       <a href="${result.largeImageURL}" target="_blank" rel="noopener noreferrer">
//       <img src="${result.webformatURL}" alt="" loading="lazy" />
//       </a>
//       <div class="info">
//         <p class="info-item">
//           <b>${result.likes}</b>
//         </p>
//         <p class="info-item">
//           <b>${result.views}</b>
//         </p>
//         <p class="info-item">
//           <b>${result.comments}</b>
//         </p>
//         <p class="info-item">
//           <b>${result.downloads}</b>
//         </p>
//       </div>
//     </div>`;
//     })
//     .join("");
//   //return markup;
//   refs.galleryEl.innerHTML = markup;
// }


//refs.galleryEl.insertAdjacentHTML("beforeend", renderList(results));


const container = document.getElementById('.container');
const loading = document.querySelector('.loading');

getPost();
getPost();
getPost();

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight });
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		// show the loading animation
		showLoading();
	}
});

function showLoading() {
	loading.classList.add('show');
	
	// load more data
	setTimeout(getPost, 1000)
}

async function getPost() {
	const postResponse = await fetch(`https://pixabay.com/api/?key=25748459-63f23aee85add1030efa422f3&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=5`);
	const postData = await postResponse.json();

	
	// const data = { post: postData };
	// addDataToDOM(data);

  addDataToDOM(postData);
}

function addDataToDOM(data) {
	const postElement = document.createElement('div');
	postElement.classList.add('photo-card');
	postElement.innerHTML = `<div class="photo-card-item">
    <img src="${data.webformatURL}" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${data.likes}</b>
      </p>
      <p class="info-item">
        <b>${data.views}</b>
      </p>
      <p class="info-item">
        <b>${data.comments}</b>
      </p>
      <p class="info-item">
        <b>${data.downloads}</b>
      </p>
    </div>
  </div>`;
  ;

  console.log('================================DATA', data)

  console.log('================================postElement', postElement)

  refs.galleryEl.insertAdjacentHTML("beforeend", postElement);

	// container.appendChild(postElement);
	
	// loading.classList.remove('show');
}

