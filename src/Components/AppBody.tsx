import React, { useState } from 'react';
import { Box, Grid, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { useDispatch } from 'react-redux';
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {clearFilters, setGenres, setFilterYear} from "../reducers/filters.reducer";
import { genreMap } from "../fixtures/GenreMap";
import '../styling/AppBody.css';
import MoviesGrid from "./MoviesGrid";

const AppBody: React.FC = () => {
    const dispatch = useDispatch();
    const [year, setYear] = useState<Dayjs | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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
                                label="Genres"
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
                <MoviesGrid/>
            </Grid>
        </Box>
    );
};

export default AppBody;
