
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

    const [img, setImg] = useState('');
    const [border, setBorder] = useState();

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

    const handleClickImage = (image, index) => {
        setImg(image)
        setBorder(index)
    }

    return (
        <Container sx={{ my: 3 }}>
            {<DialogCantBy open={open} setOpen={setOpen} />}
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: { xs: 5, md: 10 }, mb: { xs: 1, md: 2 } }}>
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
                                    <Card sx={{ p: 2 }}>
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <Box p={2}>
                                                    <Box sx={{
                                                        width: { xs: 280, md: 350, lg: 460 },
                                                        height: { xs: 280, md: 350, lg: 460 },
                                                        overflow: "hidden",
                                                        display: "flex",
                                                    }}
                                                    >
                                                        <Card
                                                            component="img"
                                                            src={!img
                                                                ? (selectedProduct.image[0])
                                                                : (img)
                                                            }
                                                            alt="product"
                                                        />
                                                    </Box>

                                                    {selectedProduct.image.map((img, index) => (

                                                        index === border

                                                            ? (<Box
                                                                onClick={() => { handleClickImage(img, index) }}
                                                                component="img"
                                                                sx={{ width: 70, height: 70, ml: 1, mt: 2, borderRadius: 0.5, border: '1px solid blue', }}
                                                                src={img}
                                                                alt="product"
                                                            />)
                                                            : (<Box
                                                                onClick={() => { handleClickImage(img, index) }}
                                                                component="img"
                                                                sx={{ width: 70, height: 70, ml: 1, mt: 2, borderRadius: 0.5 }}
                                                                src={img}
                                                                alt="product"
                                                            />)
                                                    ))
                                                    }

                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Typography
                                                    sx={{

                                                        mb: 1, display: "block",
                                                        textTransform: "uppercase",
                                                        color:
                                                            selectedProduct.status === "sale"
                                                                ? "error.main"
                                                                : "info.main",
                                                    }}
                                                >
                                                    {selectedProduct.status}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        font: { xs: 16, md: 23 },
                                                        fontWeight: 600
                                                    }}
                                                >
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
                                                <Typography sx={{
                                                    mb: 1, color: "red", font: { xs: 16, md: 23 },
                                                    fontWeight: 600
                                                }} > Price:
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

                                                <Typography sx={{
                                                    mb: 1, font: { xs: 16, md: 23 },
                                                    fontWeight: 600
                                                }}>
                                                    Unit: {selectedProduct.unit}
                                                </Typography>

                                                <Typography sx={{
                                                    mb: 3, font: { xs: 16, md: 23 },
                                                    fontWeight: 600
                                                }}>
                                                    Shop: {selectedProduct.author.shopName}
                                                </Typography>

                                                <Typography sx={{ font: { xs: 16, md: 23 } }} >
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
            <Box sx={{ mb: 10 }}></Box>
        </Container>
    );
}

export default ProductDetail;