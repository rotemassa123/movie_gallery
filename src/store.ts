import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movies.reducer';

const store = configureStore({
    reducer: {
        movie: movieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
