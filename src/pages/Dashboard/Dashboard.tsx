import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent.tsx";

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <Box>
            {/* Header */}


            {/* Content */}
            <Box padding="2rem">
                <Typography variant="h4" gutterBottom>
                    Welcome to the Dashboard
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
