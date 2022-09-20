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

    const [anchorElNav, setAnchorElNav] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const { user, logout } = useAuth();

    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };



    const handleLogin = async () => {
        try {
            handleCloseNavMenu();
            await logout(() => {
                navigate("/login")
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = async () => {
        try {
            handleCloseNavMenu();
            await logout(() => {
                navigate("/login")
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handelCart = () => {
        navigate("/login")
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                    {user?.name}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                    {user?.email}
                </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            {(!user)
                ? (<MenuItem onClick={handleLogin} sx={{ m: 1 }}>
                    Login
                </MenuItem>)
                : (<MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Logout
                </MenuItem>)
            }

        </Menu>
    );

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

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">product</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>

                    <Typography variant="h5" noWrap component="a" href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}>
                            product
                        </Button>

                    </Box>

                    <Box>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                            </Typography>
                            <Box sx={{ flexFlow: 1 }} />
                            <Box>
                                <Avatar
                                    onClick={handleProfileMenuOpen}
                                />
                            </Box>
                            {renderMenu}
                        </Toolbar>
                    </Box>

                    <Box onClick={handelCart} sx={{ flexGrow: 0 }}>

                        <IconButton aria-label="Show cart items" color="inherit">
                            <Badge
                                color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;