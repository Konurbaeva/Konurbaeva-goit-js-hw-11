import API from './api-service';

const url = 'https://pixabay.com/api';
const options = {
    headers: {
      Authorization: '25748459-63f23aee85add1030efa422f3',
    },
  };

  fetch(url, options)
  .then(r => r.json())
  .then(console.log);
