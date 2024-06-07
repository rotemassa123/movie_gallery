// App.tsx
import React from 'react';
import Appbar from "./Appbar";
import AppBody from "./AppBody";
import { Box } from '@mui/material';

const App: React.FC = () => {
    return (
        <Box className="app" >
            <Appbar/>
            <AppBody/>
        </Box>
    );
};

export default App;
