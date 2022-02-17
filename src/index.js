// import './sass/main.scss';
import API from './api-service';
import settings from './settings';

const url = settings.BASE_URL;
const options = {
    headers: {
      Authorization: settings.API_KEY,
   //   Access-Control-Allow-Origin: url,
    }
  };

/*   fetch(url, options)
  .then(r => r.json())
  .then(console.log);  */

  searchQuery()

  console.log('settings: ' + settings.BASE_URL);
  console.log('window.location.href: ' + window.location.href);