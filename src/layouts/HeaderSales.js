import Logo from "../components/logo/Logo";
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart } from "../features/cart/cartSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import DraggableDialog from "../components/dialog/Dialog"
import { getOrders } from "../features/order/orderSlice";




const MainHeader = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const [open, setOpen] = useState(false);

    let { user, logout } = useAuth();

    const navigate = useNavigate()

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { page } = useSelector((state) => state.cart)


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
                    {user?.shopName}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                    {user?.email}
                </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem
                onClick={handleMenuClose}
                to="/"
                component={RouterLink}
                sx={{ mx: 1 }}
            >
                Home
            </MenuItem>

            <DraggableDialog setOpen={setOpen} open={open} />

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
                        sx={{
                            mr: 2

                        }}
                    >
                        <Logo />
                    </IconButton>
                    <Typography variant="h6" noWrap component="a"

                        sx={{
                            mr: 15, display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace', fontWeight: 700,
                            letterSpacing: '.02rem', color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        STORE FOOD
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex' }} />

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
                                <Avatar src={user.logoUrl}
                                    alt={user.name}
                                    onClick={handleProfileMenuOpen}
                                />
                            </Box>
                            {renderMenu}
                        </Toolbar>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MainHeader;