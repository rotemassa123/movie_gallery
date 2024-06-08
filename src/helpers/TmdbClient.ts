import axios from 'axios';
import {Filters} from "../interfaces/Filters";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0b23846e4553d5dbc0ed23ca4d401fec'; // Replace 'YOUR_API_KEY' with your actual API key

const tmdbApiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        sort_by: 'vote_average.desc'
    },
});

export async function getMovies(page: number = 1, filters?: any) {
    try {
        let response;
        const params: Record<string, any> = { page, ...filters };
        const areFiltersOn = Object.values(filters).some(value => Boolean(value));
        if(!areFiltersOn){
            response = await tmdbApiClient.get('/movie/top_rated', { params });
        } else {
            response = await tmdbApiClient.get('/discover/movie', { params });
        }

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching top rated movies`);
    }
}

export async function getMoviesByName(movieName: string){
    try{
        const response = await tmdbApiClient.get('/search/movie', { params: { query: movieName } });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching movie by name');
    }
}

export default tmdbApiClient;
