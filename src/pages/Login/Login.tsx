import React, {useState} from 'react';
import {Button, TextField, Box, Typography, Paper, Grid} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightIcon from '@mui/icons-material/Flight';
import {useNavigate} from "react-router-dom";
import {users} from "../../assets/mockData/user.ts";

interface LoginProps {
    setUser: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/dashboard');
        } else {
            setError('Username or password is incorrect');
        }
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="95vh" bgcolor="#f0f2f5">
            {/* left content */}
            <Box display="flex" flex={1}>
                <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="#f5f5f5"
                    padding="2rem"
                >
                    <svg
                        width="80%"
                        height="auto"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{maxWidth: '700px', marginBottom: '2rem'}}
                    >
                        <path d="M100 10 L90 60 L70 80 L130 80 L110 60 L100 10 Z" fill="gray"/>
                        <path d="M70 85 L30 120 L40 125 L75 90 Z" fill="gray"/>
                        <path d="M130 85 L170 120 L160 125 L125 90 Z" fill="gray"/>
                        <path d="M90 65 L85 100 L115 100 L110 65 Z" fill="gray"/>
                        <text x="50%" y="130" text-anchor="middle" fontWeight="bold" font-size="24" fill="black">ICS</text>
                        <text x="50%" y="136" text-anchor="middle" font-size="4" fill="black">Integrate Cargo System</text>
                    </svg>
                </Box>

                {/* right content */}
                <Box
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding="2rem"
                >
                    <Paper elevation={3}
                           style={{padding: '2rem', width: '100%', maxWidth: '400px', borderRadius: '8px'}}>
                        <Typography variant="h4" gutterBottom style={{textAlign: 'left'}}>
                            Login
                        </Typography>
                        {error && <Typography color="error" style={{marginBottom: '1rem'}}>{error}</Typography>}
                        <form onSubmit={handleLogin}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '1.5rem', padding: '0.75rem', fontWeight: 'bold' }}
                            >
                                Login
                            </Button>
                        </form>

                        <Grid container spacing={1} justifyContent="center" style={{ marginTop: '10px' }}>
                            <Grid item>
                                <Box textAlign="center">
                                    <LocalShippingIcon
                                        style={{
                                            color: '#FF9900',
                                            fontSize: '48px',
                                            width: '80px',
                                            height: '80px',
                                            cursor: 'pointer',
                                    }}
                                    />
                                    <Typography variant="subtitle1">Queue</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box textAlign="center">
                                    <FlightIcon
                                        style={{
                                            color: '#4CAF50',
                                            fontSize: '48px',
                                            width: '80px',
                                            height: '80px' ,
                                            cursor: 'pointer',
                                    }}
                                    />
                                    <Typography variant="subtitle1">Flight</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Box>

            <Box
                component="footer"
                bgcolor="#e0e0e0"
                padding="1rem"
                textAlign="center"
                position="relative"
                width="100%"
            >
                <Typography variant="body2" color="textSecondary">
                    © 2024 Arga Corp. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
