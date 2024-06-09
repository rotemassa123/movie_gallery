import React from 'react';
import { Box, Grid } from '@mui/material';
import '../styling/AppBody.css';
import MoviesGrid from "./MoviesGrid";
import FiltersGrid from "./FiltersGrid";

const AppBody: React.FC = () => {
    return (
        <Box className="main-container">
            <Grid container spacing={2}>
                <FiltersGrid />
                <MoviesGrid />
            </Grid>
        </Box>
    );
};

export default AppBody;
