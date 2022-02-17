// import { galleryItems } from './gallery-items.js';

// console.log(galleryItems);


const galleryEl = document.querySelector('.gallery');

/* const lightBoxMarkup = item => {
    const { description, original, preview } = item;
  
    return `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
    `;
};
 */

const lightBoxMarkup = item => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
  
    return `
    <a class="gallery__item" href="${webformatURL}">
   <img class="gallery__image" src="${webformatURL}" alt="image" />
</a>
    `;
};


  
const lightBoxGalleryInserted = galleryItems
  .map(lightBoxMarkup)
  .join('');

  const handler = (event) => {
    event.preventDefault();
    //Инициализация библиотеки SimpleLightbox 
    let gallery = new SimpleLightbox('.gallery a', {captionsData: `alt`, captionDelay: 250});
    gallery.on('show.simplelightbox', function () {
      
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); 
});
}
  
  
galleryEl.insertAdjacentHTML('beforeend', lightBoxGalleryInserted);
galleryEl.addEventListener('click', handler);