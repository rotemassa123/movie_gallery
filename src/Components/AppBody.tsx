import React from 'react';
import { Box, Grid } from '@mui/material';
import '../styling/App.css';
import MovieCard from './MovieCard'; // Assuming MovieCard component is in the same directory
import movies from '../fixtures/movies.json'; // Import movies from JSON file

const AppBody: React.FC = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <Box className="column">Left Column</Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box className="column">
                        {movies.map((movie, index) => (
                            <MovieCard key={index} movie={movie} />
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box className="column">Right Column</Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppBody;
