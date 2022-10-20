
import { useEffect, useState } from "react";
import {
    Card,
    Grid,
    Container,
    Typography,
    Box,
    Stack,
    Divider,
    Breadcrumbs,
    Link,
    Button,
    Rating,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProducts } from './productSlice'

import { addShoppingCart } from "../cart/cartSlice";
import { useNavigate } from "react-router-dom"
import { fNumber } from "../../untils/numberFormat";
import DialogCantBy from "../../components/dialog/DialogCantBy";
import useAuth from "../../hooks/useAuth";

function ProductDetail() {
    const [open, setOpen] = useState(false);

    const { selectedProduct, isLoading, error } = useSelector((state) => state.product)

    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id
    const navigate = useNavigate()
    let { user } = useAuth();

    useEffect(() => {
        dispatch(getSingleProducts(id));
    }, [dispatch, id])


    const handleAddToCart = () => {
        if (!user) { navigate("/login") }
        dispatch(addShoppingCart({ productId: id }));
    };

    const handleOrderNow = () => {

        handleAddToCart()
        setTimeout(() => {
            navigate("/cart")
        }, 1000);

    }

    const handleClickOpen = () => {
        setOpen(true)
    };
    console.log(user);
    return (
        <>
            <Container sx={{ my: 3, height: 500 }}>
                {<DialogCantBy open={open} setOpen={setOpen} />}
                <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 15, mb: 4 }}>
                    <Link underline="hover" color="inherit" component={RouterLink} to="/">
                        Store Food
                    </Link>
                    <Typography color="text.primary">{selectedProduct?.productName}</Typography>
                </Breadcrumbs>
                <Box sx={{ position: "relative", height: 1 }}>
                    {isLoading ? (
                        <LoadingScreen />
                    ) : (
                        <>
                            {error ? (
                                <Alert severity="error">{error}</Alert>
                            ) : (
                                <>
                                    {selectedProduct && (
                                        <Card>
                                            <Grid container>
                                                <Grid item xs={12} md={6}>
                                                    <Box p={2}>
                                                        <Box sx={{ borderRadius: 2, overflow: "hidden", display: "flex", }}>
                                                            <Box
                                                                component="img"
                                                                sx={{
                                                                    width: 1,
                                                                    height: 1,
                                                                }}
                                                                src={selectedProduct.image[0]}
                                                                alt="product"
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            mt: 2, mb: 1, display: "block",
                                                            textTransform: "uppercase",
                                                            color:
                                                                selectedProduct.status === "sale"
                                                                    ? "error.main"
                                                                    : "info.main",
                                                        }}
                                                    >
                                                        {selectedProduct.status}
                                                    </Typography>

                                                    <Typography variant="h5" paragraph>
                                                        {selectedProduct.productName}
                                                    </Typography>

                                                    <Rating
                                                        value={selectedProduct.rating}
                                                        precision={0.1}
                                                        readOnly
                                                    />

                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={1}

                                                    >
                                                    </Stack>
                                                    <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
                                                    <Typography variant="h5" sx={{ mb: 1, color: "red" }} > Price:
                                                        <Box
                                                            component="span"
                                                            sx={{
                                                                color: "text.disabled",
                                                                textDecoration: "line-through",
                                                            }}
                                                        >
                                                            {selectedProduct.priceSale && fNumber(selectedProduct.priceSale)}đ
                                                        </Box>
                                                        &nbsp;{fNumber(selectedProduct.price)}đ
                                                    </Typography>

                                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                                        Unit: {selectedProduct.unit}
                                                    </Typography>

                                                    <Typography variant="h5" sx={{ mb: 3 }}>
                                                        Shop: {selectedProduct.author.shopName}
                                                    </Typography>

                                                    <Typography >
                                                        {selectedProduct.describe}
                                                    </Typography>

                                                    <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                                                        <Button variant="outlined" startIcon={<ShoppingCartIcon />}
                                                            onClick={() => {
                                                                if (!user) {
                                                                    navigate("/login")
                                                                } else {
                                                                    (user._id === selectedProduct.author._id)
                                                                        ? handleClickOpen()
                                                                        : handleOrderNow()
                                                                }

                                                            }}>
                                                            Order now
                                                        </Button>

                                                        <Button variant="contained" startIcon={<AddShoppingCartIcon />}
                                                            onClick={() => {
                                                                if (!user) {
                                                                    navigate("/login")
                                                                } else {
                                                                    (user._id === selectedProduct.author._id)
                                                                        ? handleClickOpen()
                                                                        : handleAddToCart()
                                                                }
                                                            }}
                                                        >
                                                            Add Shopping Cart
                                                        </Button>

                                                    </Stack>
                                                    <Box sx={{ mb: 5 }}></Box>
                                                </Grid>

                                            </Grid>

                                        </Card>

                                    )}
                                    {!selectedProduct && (
                                        <Typography variant="h6">404 Product not found</Typography>
                                    )}

                                </>
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default ProductDetail;