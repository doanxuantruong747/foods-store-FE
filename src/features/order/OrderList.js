
import { Avatar, Box, Card, Container, Divider, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

import Inventory2Icon from '@mui/icons-material/Inventory2';
import { fNumber } from "../../untils/numberFormat";
import ActionButton from "./ActionButton";

function OrderList({ orders }) {

    return (

        <Container >
            <Box sx={{ p: 3, mr: 1, mt: 10 }}>
                <Typography variant="h5" sx={{ mb: 3, }}>
                    Order Success
                </Typography>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Inventory2Icon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="You will receive the goods in the shortest time" secondary="Order Success" />
                </ListItem>
            </Box>

            <Box sx={{ p: 3, mr: 1 }}>
                <Typography variant="h5" sx={{ mt: 1, }}>
                    Your order
                </Typography>
            </Box>
            <Container>
                <Grid container spacing={2} mt={1}>
                    {orders.map((order) => {

                        order.products.map((product) => {
                            return product
                        })
                        return (
                            <Grid key={order._id} item xs={12} md={4} lg={3}>
                                <Card sx={{ p: 3, mt: 1, mr: 2, minHeight: 470 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <ActionButton status={order.status} />
                                    </Box>

                                    <Typography sx={{ mb: 3, fontSize: 13, fontWeight: 600 }}>
                                        User Name: {order.name}
                                    </Typography>

                                    <Typography sx={{ mb: 3, fontSize: 13, fontWeight: 600 }}>
                                        Address Shiping: {order.addressShiping}
                                    </Typography>

                                    <Typography sx={{ mb: 3, fontSize: 13, fontWeight: 600 }}>
                                        Phone: {order.phone}
                                    </Typography>

                                    <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
                                    {order.products.map((product) => (
                                        <Box key={product._id}>
                                            <Typography sx={{ fontSize: 13, mb: 2, fontWeight: 600, }}>
                                                Product: {product.product.productName}
                                            </Typography>

                                            <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                                <span>Price:</span>
                                                <span style={{ color: "red" }}>{fNumber(product.product.price)} đ </span>
                                            </Typography>

                                            <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                                <span>Amount:</span>
                                                <span style={{ color: "red" }}>{product.amount}</span>
                                            </Typography>

                                            <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                                <span>Sum:</span>
                                                <span style={{ color: "red" }}>{fNumber(product.sum)} đ</span>
                                            </Typography>

                                            <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

                                        </Box>

                                    ))}

                                    <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                        <span>priceShiping:</span>
                                        <span style={{ color: "red" }}>{fNumber(order.priceShiping)} đ</span>
                                    </Typography>

                                    <Divider sx={{ mb: 2 }} />


                                    <Typography sx={{ fontSize: 18, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row", color: "red" }}>
                                        <span>Total:</span>
                                        <span >{fNumber(order.total)} đ</span>
                                    </Typography>
                                    <Typography sx={{ fontStyle: "italic", fontSize: 12, fontWeight: 300 }}>
                                        (Pay the money when receiving the goods)
                                    </Typography>

                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                <Box sx={{ mb: 20 }}>

                </Box>
            </Container>
        </Container >
    );
}

export default OrderList

