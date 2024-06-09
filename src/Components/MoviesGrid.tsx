import React, { useEffect, useState } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { Movie } from "../interfaces/Movie";
import { RootState } from '../store';
import { getMovies } from "../helpers/TmdbClient";
import { setMovies, setTotalPages } from "../reducers/movies.reducer";
import '../styling/AppBody.css';

const MoviesGrid: React.FC = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPageLocal] = useState<number>(1);

    // Correctly use the root state type
    const movies = useSelector((state: RootState) => state.movie.movies);
    const totalPages = useSelector((state: RootState) => state.movie.totalPages);
    const filters = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMovies(currentPage, filters);
                dispatch(setMovies(response.results));
                dispatch(setTotalPages(response.total_pages));
            } catch (error) {
                console.error('Error fetching initial movies:', error);
            }
        };
        fetchMovies();
    }, [dispatch, filters, currentPage]);

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPageLocal(value);
    };
    return (
        <Grid item xs={12} md={10}>
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
    );
};

export default MoviesGrid;
