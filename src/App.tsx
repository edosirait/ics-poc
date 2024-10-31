import React, {useEffect, useState} from 'react';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import theme from './theme/theme';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import CargoOutgoing from "./pages/CargoOutgoing/CargoOutgoing.tsx";
import {AppBarComponent, SidebarComponent} from "./components";
import CargoOutgoingDetail from "./pages/CargoOutgoing/CargoOutgoingDetail.tsx";
import CargoIncoming from "./pages/CargoIncoming";
import CargoIncomingDetail from "./pages/CargoIncoming/CargoIncomingDetail.tsx";
import Payment from "./pages/Payment";
import PaymentDetail from "./pages/Payment/PaymentDetail.tsx";

const App: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = Boolean(user);

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
    };

    if (loading) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                {isAuthenticated && <AppBarComponent user={user} handleLogout={handleLogout} />}
                <Box sx={{ display: 'flex', maxheight: '100vh' }}>
                    {isAuthenticated && (
                        <Box sx={{ width: '30%', maxWidth: '300px' }}>
                            <SidebarComponent />
                        </Box>
                    )}
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            width: isAuthenticated ? '80%' : '100%',
                            bgcolor: '#d1d3d4',
                            p: 3,
                            minHeight: '100vh', // Pastikan ini ditambahkan
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Login setUser={setUser} />} />
                            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />

                            <Route
                                path="/payment-data"
                                element={isAuthenticated ? <Payment /> : <Navigate to="/" />}
                            />
                            <Route
                                path="/payment-data/edit/:payment_id"
                                element={isAuthenticated ? <PaymentDetail /> : <Navigate to="/" />} />

                            <Route
                                path="/cargo-outgoing"
                                element={isAuthenticated ? <CargoOutgoing /> : <Navigate to="/" />}
                            />
                            <Route
                                path="/cargo-outgoing/edit/:cargo_id"
                                element={isAuthenticated ? <CargoOutgoingDetail /> : <Navigate to="/" />} />

                            <Route
                                path="/cargo-incoming"
                                element={isAuthenticated ? <CargoIncoming /> : <Navigate to="/" />}
                            />
                            <Route
                                path="/cargo-incoming/edit/:cargo_id"
                                element={isAuthenticated ? <CargoIncomingDetail /> : <Navigate to="/" />} />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
