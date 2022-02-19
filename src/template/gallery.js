const galleryEl = document.querySelector('.gallery');

const lightBoxMarkup = item => {
   // const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
   const { webformatURL, likes, views, comments, downloads } = item;
  
    return `
    <div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>
    `;
};

  
const lightBoxGalleryInserted = galleryItems
  .map(lightBoxMarkup)
  .join('');


export function renderSearchResult(result) {
  const markup = lightBoxMarkup(result);
  galleryEl.innerHTML = markup;
 }

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