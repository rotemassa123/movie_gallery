import React, { useState } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import MovieCard from './MovieCard'; // Assuming MovieCard component is in the same directory
import movies from '../fixtures/movies.json'; // Import movies from JSON file
import '../styling/App.css';

const AppBody: React.FC = () => {
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = movies.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentMovies = movies.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
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
                        {currentMovies.map((movie, index) => (
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
