import Logo from "../components/logo/Logo";
import { useEffect, useState } from 'react';
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

import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart } from "../features/cart/cartSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import DraggableDialog from "../components/dialog/Dialog"
import { getOrders } from "../features/order/orderSlice";




const MainHeader = () => {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const [open, setOpen] = useState(false);

    let { user, logout } = useAuth();

    const navigate = useNavigate()

    const handleClickOpen = () => {

        setOpen(true);
        handleMenuClose();
    };


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

    const { carts, page } = useSelector((state) => state.cart)
    const { orders } = useSelector((state) => state.order)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getShoppingCart(page))
    }, [dispatch, page])

    useEffect(() => {
        if (user)
            dispatch(getOrders(page))
    }, [dispatch, page, user])



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
        if (carts.length !== 0 && carts.totalItem !== 0) { navigate("/cart") } else { alert('Cart without any products') }
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

            <MenuItem
                onClick={handleMenuClose}
                to="/account"
                component={RouterLink}
                sx={{ mx: 1 }}
            >
                Account Settings
            </MenuItem>

            <DraggableDialog setOpen={setOpen} open={open} />
            {
                (orders.length)
                    ? (<MenuItem sx={{ mx: 1 }} onClick={() => { navigate("/order"); handleMenuClose() }}>
                        My order
                    </MenuItem>)
                    : (<MenuItem sx={{ mx: 1 }} onClick={handleClickOpen}>
                        My order
                    </MenuItem>)
            }


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
                        href="/"
                        sx={{
                            mr: 15, display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace', fontWeight: 700,
                            letterSpacing: '.02rem', color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        STORE FOOD
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large" color="inherit"
                            aria-label="account of current user"
                            aria-controls="menu-appbar" aria-haspopup="true"
                            onClick={handleOpenNavMenu}
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
                                <Typography textAlign="center">Product</Typography>
                            </MenuItem>

                            <MenuItem onClick={handleCloseNavMenu}>
                                <RouterLink to="/sales" target="_blank" style={{ textDecoration: "none" }}>
                                    <Typography textAlign="center">
                                        Sales with me
                                    </Typography>

                                </RouterLink>
                            </MenuItem>

                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            href="/"
                            sx={{ my: 2, color: 'white', display: 'block' }}>
                            Product
                        </Button>

                        <RouterLink to="/sales" target="_blank" style={{ textDecoration: "none" }}>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block', }}>
                                Sales with me
                            </Button>
                        </RouterLink>
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
                                <Avatar src={user.avataUrl}
                                    alt={user.name}
                                    onClick={handleProfileMenuOpen}
                                />
                            </Box>
                            {renderMenu}
                        </Toolbar>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <IconButton onClick={handelCart} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge
                                    badgeContent={carts.totalItem}
                                    color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>)

                            : (<IconButton onClick={handelCart} aria-label="Show cart items" color="inherit">
                                <Badge

                                    color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>)
                        }
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MainHeader;