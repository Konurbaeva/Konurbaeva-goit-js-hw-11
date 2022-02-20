// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

let simpleLightBox = new SimpleLightbox('.gallery a', {captionsData: `alt`, captionDelay: 250});
simpleLightBox.on('show.simplelightbox', function () {
  console.log('gallery on '); 
});

simpleLightBox.on('error.simplelightbox', function (e) {
console.log(e); 
});

export {simpleLightBox};