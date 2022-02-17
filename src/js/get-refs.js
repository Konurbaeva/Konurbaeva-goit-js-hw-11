export default function getRefs() {
    return {
      searchBox: document.querySelector('input[name="searchQuery"]'),
      form: document.querySelector('.search-form'),
      button: document.querySelector('button[type="submit"]')
    };
  }