/* import InfiniteScroll from 'infinite-scroll';

const infScroll = new InfiniteScroll('.container', {
  responseType: 'text',
  history: false,
  path() {
    return `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
  },
});

infScroll.loadNextPage(); 

infScroll.on('load', (response, path) => {
  console.log(JSON.parse(response));
  console.log(path);
});
 */

