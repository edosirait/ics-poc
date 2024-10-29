import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Divider, Box } from '@mui/material';
import { AccountCircle, Settings, Logout } from '@mui/icons-material';

interface AppBarProps {
    user: any;
    handleLogout: () => void;
}

const AppBarComponent: React.FC<AppBarProps> = ({ user, handleLogout }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                flexShrink: 0,
                boxSizing: 'border-box',
                background: 'linear-gradient(180deg, #F0F0F0, #FFFFFF)',
                color: '#FFFFFF',
                boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
                    SITEK Reborn Dummy
                </Typography>

                <IconButton style={{ color: '#000000'}} onClick={handleMenuClick}>
                    <AccountCircle style={{ marginRight: '8px' }} />
                    <Typography variant="subtitle1" color="inherit" style={{ marginRight: '8px' }}>
                        {user?.username} ({user?.branch})
                    </Typography>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            bgcolor: '#f0f0f0',
                            color: '#333',
                            minWidth: '200px',
                        },
                    }}
                >
                    <Box padding="1rem">
                        <Typography variant="body1">Username: {user?.username}</Typography>
                        <Typography variant="body1">Role: {user?.role}</Typography>
                        <Typography variant="body1">Branch: {user?.branch}</Typography>
                        <Typography variant="body1">Last Login: {user?.lastLogin}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#e0f7fa' }, fontWeight: 'bold' }}>
                        <Settings fontSize="small" /> Change Branch
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#e0f7fa' }, fontWeight: 'bold' }}>
                        <Settings fontSize="small" /> Change Password
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ '&:hover': { backgroundColor: '#ffe0b2' }, fontWeight: 'bold' }}>
                        <Logout fontSize="small" /> Log Out
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
