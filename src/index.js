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

 const fetchPostsBtn = document.querySelector(".load-more");
 const galleryList = document.querySelector(".gallery");
 
 // Controls the group number
 let page = 1;
 // Controls the number of items in the group
 let per_page = 5;
 // In our case total number of pages is calculated on frontend
 const totalPages = 100 / per_page;
 
 fetchPostsBtn.addEventListener("click", () => {
   // Check the end of the collection to display an alert
   if (page > totalPages) {
     console.log('page > totalPages')
   }
 
   fetchPosts()
     .then((posts) => {
       renderPosts(posts);
       // Increase the group number
       page += 1;
 
       // Replace button text after first request
       if (page > 1) {
         fetchPostsBtn.textContent = "Fetch more posts";
       }
     })
     .catch((error) => console.log(error));
 });
 
 async function fetchPosts() {
   const params = new URLSearchParams({
     page: page,
     per_page:per_page
   });
 
   const response = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${refs.inputEl.value}&image_type=photo&orientation=horizontal&safesearch=true&${params}`);
   if (!response.ok) {
     throw new Error(response.status);
   }
   return await response.json();
 }
 
 function renderPosts(data) {
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
     galleryList.insertAdjacentHTML("beforeend", markup);
 }
