
import { Card, Container, Grid, Typography } from "@mui/material";
import CartsTable from './CartsTable';
import CartOrder from './CartOrder';
import { useEffect, useState } from "react";
import { Box } from "@mui/system";


function CartsList({ carts }) {

    const Carts = carts.Carts
    const [cartCount, setCartCount] = useState(Carts)

    useEffect(() => {
        setCartCount(carts.Carts)
    }, [carts.Carts])


    return (

        <Container fixed >

            <Grid sx={{
                mt: 15,
                display: { md: "flex" },
                justifyContent: { md: "space-around" }

            }}>

                <Card sx={{
                    p: 3, mb: 3,
                    mr: { xs: 0, md: 2 }
                }}>
                    <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: 20 }, fontWeight: 600 }}>
                        Cart
                    </Typography>
                    <CartsTable cartCount={cartCount} setCartCount={setCartCount} />
                </Card>

                <Card sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: 20 }, fontWeight: 600 }}>
                        Order
                    </Typography>
                    <CartOrder cartCount={cartCount} />
                </Card>

            </Grid>

            <Box sx={{ mb: 15 }} />
        </Container>
    );
}

export default CartsList

