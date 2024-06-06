import { AppBar, InputBase, Toolbar, Typography } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../styling/Appbar.css';

const Appbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar className="toolbar">
                <Typography variant="h6" noWrap component="div" className="title">
                    Movie Gallery
                </Typography>
                <div className="search-container">
                    <div className="search">
                        <SearchIcon className="searchIcon"/>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            className="inputRoot inputInput"
                        />
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
