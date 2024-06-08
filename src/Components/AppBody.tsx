import React, { useState, useEffect } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { getTopRatedMovies } from '../helpers/AxiosClient';
import { setMovies } from "../reducers/movies.reducer";
import { Movie } from "../interfaces/Movie";
import { RootState } from '../store';

const AppBody: React.FC = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPageLocal] = useState<number>(1);

    // Correctly use the root state type
    const movies = useSelector((state: RootState) => state.movie.movies);
    const totalPages = useSelector((state: RootState) => state.movie.totalPages);

    useEffect(() => {
        const fetchInitialMovies = async () => {
            try {
                const response = await getTopRatedMovies();
                dispatch(setMovies(response.data.results));
            } catch (error) {
                console.error('Error fetching initial movies:', error);
            }
        };

        fetchInitialMovies();
    }, [dispatch]);

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPageLocal(value);
        try {
            const response = await getTopRatedMovies(value);
            dispatch(setMovies(response.data.results));
        } catch (error) {
            console.error('Error fetching movies for page:', value, error);
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <Box className="column" mb={2}> {/* Add margin bottom */}
                        Left Column
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box className="column">
                        {movies.map((movie: Movie, index: number) => (
                            <MovieCard key={index} movie={movie} />
                        ))}
                    </Box>
                    <Box className="pagination" mt={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box className="column" mb={2}> {/* Add margin bottom */}
                        Right Column
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppBody;
