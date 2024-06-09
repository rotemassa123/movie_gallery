import React, { useEffect, useState } from 'react';
import { Box, Grid, Pagination, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { Movie } from "../interfaces/Movie";
import { RootState } from '../store';
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getMovies } from "../helpers/TmdbClient";
import { setMovies, setTotalPages } from "../reducers/movies.reducer";
import {clearFilters, setGenres, setFilterYear} from "../reducers/filters.reducer";
import { genreMap } from "../fixtures/GenreMap";
import '../styling/AppBody.css';

const AppBody: React.FC = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPageLocal] = useState<number>(1);
    const [year, setYear] = useState<Dayjs | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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
    }, [dispatch, filters, selectedGenres, currentPage]);

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPageLocal(value);
    };

    const handleYearChange = (newValue: Dayjs | null) => {
        setYear(newValue);
        dispatch(setFilterYear(newValue));
    };

    const handleGenreChange = (event: SelectChangeEvent<string[]>) => {
        const newGenres = event.target.value as string[];
        setSelectedGenres(newGenres);
        dispatch(setGenres(newGenres));
    };

    const handleClearFilters = () => {
        setYear(null);
        setSelectedGenres([]);
        dispatch(clearFilters());
    };

    return (
        <Box className="main-container">
            <Grid container spacing={2}>
                <Grid item xs={12} md={2} className="filter-container">
                    <Box className="filters" mb={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={['year']}
                                label="Year"
                                value={year}
                                onChange={handleYearChange}
                                maxDate={dayjs('2024-12-31')}
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
                            <InputLabel id="genre-select-label">Genres</InputLabel>
                            <Select
                                labelId="genre-select-label"
                                id="genre-select"
                                multiple
                                value={selectedGenres}
                                onChange={handleGenreChange}
                                renderValue={(selected) => {
                                    const selectedGenresNames = (selected as string[]).map(id => genreMap[parseInt(id)]);
                                    return selectedGenresNames.join(', ');
                                }}
                                label="Genres" // This line ensures the label animates correctly
                            >
                                {Object.entries(genreMap).map(([id, name]) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClearFilters}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Clear Filters
                        </Button>
                    </Box>
                </Grid>
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
            </Grid>
        </Box>
    );
};

export default AppBody;
