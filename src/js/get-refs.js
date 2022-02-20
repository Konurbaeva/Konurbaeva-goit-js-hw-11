export default function getRefs() {
    return {
      inputEl: document.querySelector('input[name="searchQuery"]'),
      searchForm: document.querySelector('.search-form'),
      button: document.querySelector('button[type="submit"]'),
      galleryEl: document.querySelector('.gallery')
    };
  }