
import { Box, Card, Container, Typography } from "@mui/material";
import CartsTable from './CartsTable';
import CartOrder from './CartOrder';


function CartsList({ carts }) {
    const Carts = carts.Carts

    return (

        <Container fixed sx={{ display: { xs: "20%", md: "auto" } }}>
            <Box sx={{ mt: 15, display: "flex", justifyContent: "space-around" }}>

                <Card sx={{ p: 3, mr: 1 }}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Cart
                    </Typography>
                    <CartsTable Carts={Carts} />
                </Card>

                <Card sx={{ p: 3, minWidth: 250 }}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Order
                    </Typography>
                    <CartOrder carts={carts} />
                </Card>

            </Box>

        </Container>
    );
}

export default CartsList

