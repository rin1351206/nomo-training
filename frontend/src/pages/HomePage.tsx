import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Avatar,
} from '@mui/material';
import DomainVerificationRoundedIcon from '@mui/icons-material/DomainVerificationRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import { logout } from '../services/loginService';

const drawerWidth = 240;

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');

    const handleLogout = async () => {
        const response = await logout();
        if (response.success) {
            navigate('/');
        } else {
            console.error('ログアウトに失敗しました:', response.message);
        }
    };

    const handleWorkoutClick = () => {
        setMessage('筋トレボタン押されました');
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            野本の勉強用
                        </Typography>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={handleLogout}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'scale(1.05)',
                                    transition: 'all 0.3s ease-in-out'
                                }
                            }}
                        >
                            ログアウト
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{
                marginTop: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 200, height: 200 }}>
                            <DomainVerificationRoundedIcon sx={{ fontSize: '160px', color: '#fff' }} />
                        </Avatar>
                    </IconButton>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: '30px' }}>
                        Todo
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 200, height: 200 }}>
                            <FitnessCenterRoundedIcon sx={{ fontSize: '160px', color: '#fff' }} />
                        </Avatar>
                    </IconButton>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: '30px' }}>
                        筋トレ
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default HomePage;