import axios from 'axios';

const API_KEY = '40831158-570978b10e9a43fe0d856b395';
const BASE_URL = 'https://pixabay.com/api';

export async function fetchService(value, page) {
  // const options = {
  //   params: {
  //     key: API_KEY,
  //     q: value,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: true,
  //     page,
  //     per_page: 40,
  //   },
  // };

  // const { data } = await axios.get(BASE_URL, options);
  // return data;
  return axios.get(`https://pixabay.com/api/?key=40831158-570978b10e9a43fe0d856b395&q=${value}&image_type=photo&orientation=horizontal&safesearc=true&page=${page}&per_page=40`).then(({ data }) => data);
}

// return axios.get(BASE_URL, options).then(({ data }) => data);
// `${BASE_URL}?key=${API_KEY}`
// 'https://pixabay.com/api/?key=40831158-570978b10e9a43fe0d856b395'
// https://pixabay.com/api/?key=40831158-570978b10e9a43fe0d856b395&q=yellow+flowers&image_type=photo
// `${BASE_URL}/?${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearc=true&page=${page}&per_page=40`
