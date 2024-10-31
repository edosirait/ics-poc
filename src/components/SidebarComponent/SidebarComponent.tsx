import {Drawer, List, ListItemIcon, ListItemText, Toolbar, Box, ListItemButton, Typography} from '@mui/material';
import { Payment, LocalShipping, Inbox } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React from "react";

const drawerWidth = 300;

interface MenuItem {
    text: string;
    icon: JSX.Element;
    path: string;
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const menuItems: MenuItem[] = [
        { text: 'Payment', icon: <Payment />, path: '/payment-data' },
        { text: 'Cargo Outgoing', icon: <LocalShipping />, path: '/cargo-outgoing' },
        { text: 'Cargo Incoming', icon: <Inbox />, path: '/cargo-incoming' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: '#1D2250', // Hapus tanda kurung tutup tambahan di sini
                    color: '#FFFFFF',
                    boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 8}}>
                    <Typography variant="h2" fontWeight="bold" sx={{ color: '#F0F0F0' }}>
                        ICS
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#F0F0F0' }}>
                        Integrated Cargo System
                    </Typography>
                </Box>
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item: MenuItem) => (
                        <ListItemButton
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={{
                                color: location.pathname === item.path ? '#F0F0F0' : '#F0F0F0',
                                backgroundColor: location.pathname === item.path ? '#34495E' : 'transparent',
                                borderRadius: '8px',
                                margin: '5px',
                                '&:hover': {
                                    backgroundColor: '#34495E',
                                    color: '#F0F0F0',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? '#F0F0F0' : '#F0F0F0' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
