export default function getRefs() {
    return {
      inputEl: document.querySelector('input[name="searchQuery"]'),
      searchForm: document.querySelector('.search-form'),
      button: document.querySelector('button[type="submit"]'),
      galleryEl: document.querySelector('.gallery'),
      containerEl: document.querySelector('.container'),
      photoCardEl: document.querySelector('.photo-card'),
      loadMoreButton: document.querySelector('button.load-more'),
      sentinel: document.querySelector('#sentinel')
    };
  }
