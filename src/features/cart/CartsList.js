
import { Card, Container, Grid, Typography } from "@mui/material";
import CartsTable from './CartsTable';
import CartOrder from './CartOrder';


function CartsList({ carts }) {
    const Carts = carts.Carts

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
                    <CartsTable Carts={Carts} />
                </Card>

                <Card sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: 20 }, fontWeight: 600 }}>
                        Order
                    </Typography>
                    <CartOrder carts={carts} />
                </Card>

            </Grid>

        </Container>
    );
}

export default CartsList

