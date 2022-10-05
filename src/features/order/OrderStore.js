
import { Box, Card, Container, Divider, Grid, IconButton, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

import { fNumber } from "../../untils/numberFormat";
import ActionButton from "./ActionButton";
import { getOrdersSeller } from "./orderSlice"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UpdateStatusOrder from "./UpdateStatusOrder";
import SearchSelectBox from "../../components/searchSelectBox/SearchSelectBox";



function OrderStore() {
    const [open, setOpen] = useState(false);
    const [orderCurrent, setOderCurrent] = useState([]);
    let [page, setPage] = useState(1);
    let [filterName, setFilterName] = useState("");

    const { user } = useAuth();
    const userId = user._id



    const dispatch = useDispatch();
    const { ordersSeller, totalOrders } = useSelector((state) => state.order)

    useEffect((status) => {
        status = filterName
        if (user)
            dispatch(getOrdersSeller({ page, userId, status }))
    }, [dispatch, page, user, userId, filterName])

    const handleClickOpen = (order) => {
        setOderCurrent(order);
        setOpen(true)

    };

    const handleSubmit = (searchQuery) => {
        setFilterName(searchQuery);
    };
    const handleChange = (even, value) => {
        setPage(value);
    };


    return (
        <Container >
            <Box sx={{ p: 3, mr: 1, mt: 5 }}>
                <Typography variant="h5" sx={{ fontSize: { xs: 16, md: 30 }, fontWeight: 600 }}>
                    Orders
                </Typography>
            </Box>

            <UpdateStatusOrder orderCurrent={orderCurrent} setOpen={setOpen} open={open} />

            <Card>
                <Box
                    sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }} >
                    <SearchSelectBox handleSubmit={handleSubmit} />

                    <Pagination
                        count={Math.ceil(totalOrders / 10)}
                        page={page} onChange={handleChange} />
                </Box>

                <Container sx={{ mb: 5 }}>
                    <Grid container spacing={2} mt={1} >
                        {ordersSeller.map((order) => (
                            <Grid key={order._id} item xs={12} md={4} lg={3}>
                                <Card sx={{ p: 3, mt: 1, mr: 2, minHeight: 500 }}>
                                    <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
                                        <ActionButton status={order.status} />
                                        <IconButton
                                            onClick={() => { handleClickOpen(order) }}
                                            sx={{ height: 30, width: 30 }}>
                                            <MoreHorizIcon />
                                        </IconButton>
                                    </Box>
                                    <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                                        CodeID: {order.orderId}
                                    </Typography>

                                    <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                                        Buyer Name: {order.buyerName}
                                    </Typography>

                                    <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                                        Address Shiping: {order.addressShiping}
                                    </Typography>

                                    <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                                        Phone: {order.phone}
                                    </Typography>

                                    <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

                                    <Typography sx={{ fontSize: 13, mb: 2, fontWeight: 600, }}>
                                        Product: {order.productName}
                                    </Typography>

                                    <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                        <span>Price:</span>
                                        <span style={{ color: "red" }}>{fNumber(order.price)} đ </span>
                                    </Typography>

                                    <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                        <span>Amount:</span>
                                        <span style={{ color: "red" }}>{order.amount}</span>
                                    </Typography>

                                    <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                        <span>Sum:</span>
                                        <span style={{ color: "red" }}>{fNumber(order.sum)} đ</span>
                                    </Typography>

                                    <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

                                    <Typography sx={{ fontStyle: "italic", fontSize: 12, fontWeight: 300 }}>
                                        (Pay the money when receiving the goods)
                                    </Typography>
                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid>
                </Container>
            </Card>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ mb: 15 }} />
        </Container>
    );
}

export default OrderStore;