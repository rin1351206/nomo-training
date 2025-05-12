import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    AppBar,
    Toolbar,
} from '@mui/material';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="Home-container">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        野本の勉強用
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default HomePage;