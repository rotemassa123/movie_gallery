import React, {useEffect, useState} from 'react';
import { Box, Grid, Pagination, Button } from '@mui/material';
import {DateRange, DateRangePicker} from '@mui/x-date-pickers-pro';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { Movie } from "../interfaces/Movie";
import { RootState } from '../store';
import { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getMovies } from "../helpers/TmdbClient";
import { setMovies, setTotalPages } from "../reducers/movies.reducer";
import {clearFilters, setDates} from "../reducers/filters.reducer";

const AppBody: React.FC = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPageLocal] = useState<number>(1);
    const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);

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
    }, [dispatch, filters]);

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPageLocal(value);
        try {
            const response = await getMovies(value);
            dispatch(setMovies(response.results));
        } catch (error) {
            console.error('Error fetching movies for page:', value, error);
        }
    };

    const handleDateRangeChange = async (newValue: DateRange<Dayjs>) => {
        try {
            setDateRange(newValue);
            dispatch(setDates(newValue));
        } catch (error) {
            console.error('Error fetching movies for date range:', error);
        }
    };

    const handleClearFilters = () => {
        setDateRange([null, null]);
        dispatch(clearFilters());
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <Box className="column" mb={2}>
                        {/* Add margin bottom */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateRangePicker
                                value={dateRange}
                                onChange={(newValue) => handleDateRangeChange(newValue)}
                            />
                        </LocalizationProvider>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClearFilters}
                            fullWidth
                            sx={{ mt: 2 }} // Add margin top
                        >
                            Clear Filters
                        </Button>
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
                    <Box className="column" mb={2}>
                        {/* Add margin bottom */}
                        Right Column
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppBody;
