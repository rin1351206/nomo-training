import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    AppBar,
    Toolbar,
    Button,
} from '@mui/material';
import { logout } from '../services/loginService';

const HomePage: React.FC = () => {
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
        <div className="Home-container">
            <AppBar position="static">
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
        </div>
    );
};

export default HomePage;