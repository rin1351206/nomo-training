import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    AppBar,
    Toolbar,
    Button,
    Drawer,
    Divider,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { logout } from '../services/loginService';

const drawerWidth = 240;

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
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        marginTop: '64px', // AppBarの高さ分のマージン
                    },
                }}
            >
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Todoリスト'].map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CheckRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
                {/* メインコンテンツをここに配置 */}
            </Box>
        </Box>
    );
};

export default HomePage;