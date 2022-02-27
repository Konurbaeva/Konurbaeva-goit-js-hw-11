// import InfiniteScroll from 'infinite-scroll';
// import ImageApiService from './api-service';
// import apiSettings from '../settings';
// import getRefs from './get-refs';

// //console.log('InfiniteScroll ', InfiniteScroll)

// const { BASE_URL, API_KEY } = apiSettings;
// const refs = getRefs();

// let infScroll = new InfiniteScroll('.container', {
//     // options
//     responseType: 'text',
//     history: false,
//     isLoading: true,
//    // append: true,
//     path() {
//       // let pageNumber = this.loadCount + 1;
//       // return `${BASE_URL}/?key=${API_KEY}&q=${refs.inputEl.value}&page=${pageNumber}`; 

//       return `${BASE_URL}/?key=${API_KEY}&q=cat&page=${this.pageIndex}`; 
//       }
//   }); 

//   infScroll.loadNextPage();

//   console.log(infScroll)

//   setTimeout(() => {
//       infScroll.loadNextPage();
//   }, 1000);

//   infScroll.on('load', (response, path) => {
//     console.log('JSON from infScroll' , JSON.parse(response));

//    // infScroll.appendItems(JSON.parse(response.hits));

//    // infScroll.appendItems(getFetch);

//     // тут по шаблну сделали строку с тегами

//   // потом кинули в фрагмент
//   // фрагмент передали в infScroll.appendItems(фоагмент)
//   const markup = '<p>gsdgdgd</p>'
// const fragment = new DocumentFragment();
// fragment.innerHTML = markup;

// infScroll.appendItems(fragment);

//   }); 

// const markup = '<p>gsdgdgd</p>'
// const fragment = new DocumentFragment();
// fragment.innerHTML = markup;

// console.log(fragment);


