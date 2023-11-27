import axios from 'axios';

const API_KEY = '40831158-570978b10e9a43fe0d856b395';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchService(value, page) {
  const options = {
    params: {
      key: API_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 40,
    },
  };

  const { data } = await axios.get(BASE_URL, options);
  return data;
}
