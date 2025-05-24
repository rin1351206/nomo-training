import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    IconButton,
    Avatar,
} from '@mui/material';
import DomainVerificationRoundedIcon from '@mui/icons-material/DomainVerificationRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CommonAppBar from '../components/CommonAppBar';

const drawerWidth = 240;

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');

    const handleRecordClick = () => {
        navigate('/record');
    };

    const handleTrainingClick = () => {
        navigate('/training');
    };

    const handleMealClick = () => {
        navigate('/meal');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CommonAppBar />
            </Box>
            <Box sx={{
                marginTop: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton onClick={handleRecordClick}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 200, height: 200 }}>
                            <DomainVerificationRoundedIcon sx={{ fontSize: '160px', color: '#fff' }} />
                        </Avatar>
                    </IconButton>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: '30px' }}>
                        記録
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton onClick={handleTrainingClick}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 200, height: 200 }}>
                            <FitnessCenterRoundedIcon sx={{ fontSize: '160px', color: '#fff' }} />
                        </Avatar>
                    </IconButton>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: '30px' }}>
                        トレーニング
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton onClick={handleMealClick}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 200, height: 200 }}>
                            <RestaurantRoundedIcon sx={{ fontSize: '160px', color: '#fff' }} />
                        </Avatar>
                    </IconButton>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: '30px' }}>
                        食事
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton onClick={handleProfileClick}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 200, height: 200 }}>
                            <PersonRoundedIcon sx={{ fontSize: '160px', color: '#fff' }} />
                        </Avatar>
                    </IconButton>
                    <Typography variant="h6" sx={{ mt: 2, fontSize: '30px' }}>
                        あなた
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default HomePage;