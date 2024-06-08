import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movies.reducer';
import filtersReducer from "./reducers/filters.reducer";

const store = configureStore({
    reducer: {
        movie: movieReducer,
        filters: filtersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
