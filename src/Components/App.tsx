// App.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Appbar from './Appbar';
import AppBody from './AppBody';
import { Box } from '@mui/material';
import { setMovies, setTotalPages } from '../reducers/movies.reducer';
import { getTopRatedMovies } from '../helpers/TmdbClient';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInitialMovies = async () => {
            try {
                const response = await getTopRatedMovies();
                dispatch(setMovies(response.results));
                dispatch(setTotalPages(response.total_pages));
            } catch (error) {
                console.error('Error fetching initial movies:', error);
            }
        };

        fetchInitialMovies();
    }, [dispatch]);

    return (
        <Box className="app">
            <Appbar />
            <AppBody />
        </Box>
    );
};

export default App;
