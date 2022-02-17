import axios from 'axios';
import API from './api-service';


export const getSearchResult = () => {
    return axios.get(API);
}