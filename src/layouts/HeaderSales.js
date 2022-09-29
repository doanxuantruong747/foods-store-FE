import Logo from "../components/logo/Logo";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Badge, Divider } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const { user, logout } = useAuth();

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {

            await logout(() => {
                navigate("/login")
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = async () => {
        try {

            await logout(() => {
                navigate("/login")
            })
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton edge="start" color="inherit" aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Logo />
                    </IconButton>
                    <Typography variant="h6" noWrap component="a"

                        sx={{
                            mr: 15,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        STORE FOOD
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;