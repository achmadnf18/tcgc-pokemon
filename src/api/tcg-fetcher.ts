import axios from 'axios';

const tcgFetcher = axios.create({
  baseURL: 'https://api.pokemontcg.io', // YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': '52595b1b-3e2f-4752-b8e6-cd705622fc34',
  },
});
tcgFetcher.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

export default tcgFetcher;
