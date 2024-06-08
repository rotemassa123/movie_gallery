import axios from 'axios';
import {Filters} from "../interfaces/Filters";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0b23846e4553d5dbc0ed23ca4d401fec'; // Replace 'YOUR_API_KEY' with your actual API key

const tmdbApiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export async function getTopRatedMovies(page: number = 1, filters?: Partial<Filters>) {
    try {
        const params: Record<string, any> = { page, ...filters };
        const response = await tmdbApiClient.get('/movie/top_rated', { params });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching top rated movies`);
    }
}

export default tmdbApiClient;
