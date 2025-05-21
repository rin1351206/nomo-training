import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { logout } from '../services/loginService';
import { useNavigate } from 'react-router-dom';

const MealPage: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await logout();
        if (response.success) {
            navigate('/');
        } else {
            console.error('ログアウトに失敗しました:', response.message);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        のもトレーニング
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
    );
};

export default MealPage;
