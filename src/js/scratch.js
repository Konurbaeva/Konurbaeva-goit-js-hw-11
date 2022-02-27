//const container = document.getElementById('.container');

const container = document.getElementById('.gallery');
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

	
	const data = { post: postData };
	
	addDataToDOM(data);
}

function addDataToDOM(data) {
	const postElement = document.createElement('div');
	postElement.classList.add('blog-post');
	postElement.innerHTML = `<div class="photo-card">
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
	container.appendChild(postElement);
	
	loading.classList.remove('show');
}