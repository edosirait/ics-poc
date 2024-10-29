import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingComponent: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingComponent;
