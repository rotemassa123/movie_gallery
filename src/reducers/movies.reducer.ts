import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from "../interfaces/Movie";

export interface MovieState {
    movies: Movie[];
    totalPages: number;
}

const initialState: MovieState = {
    movies: [],
    totalPages: 0,
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<Movie[]>) {
            state.movies = action.payload;
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload;
        },
    },
});

export const { setMovies, setTotalPages} = movieSlice.actions;
export default movieSlice.reducer;
