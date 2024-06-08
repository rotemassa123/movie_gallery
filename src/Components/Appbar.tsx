import { AppBar, InputBase, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../styling/Appbar.css';
import {getMoviesByName, getTopRatedMovies} from "../helpers/TmdbClient";
import {setMovies, setTotalPages} from "../reducers/movies.reducer";
import {useDispatch} from "react-redux";

const Appbar: React.FC = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        if(event.target.value === ''){
            try {
                const response = await getTopRatedMovies();
                dispatch(setMovies(response.results));
                dispatch(setTotalPages(response.total_pages));
            } catch (error) {
                console.error('Error fetching initial movies:', error);
            }
        }
    };

    const onSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const response = await getMoviesByName(searchQuery);
            dispatch(setMovies(response.results));
            dispatch(setTotalPages(response.total_pages));
        }
    };

    return (
        <AppBar position="static">
            <Toolbar className="toolbar">
                <Typography variant="h6" noWrap component="div" className="title">
                    Movie Gallery
                </Typography>
                <div className="search-container">
                    <div className="search">
                        <SearchIcon className="searchIcon" />
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            className="inputRoot inputInput"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={onSearch} // Handle key down event
                        />
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
