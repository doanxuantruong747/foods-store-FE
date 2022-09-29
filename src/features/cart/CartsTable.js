import React from "react";
import {
    Table,
    TableHead,
    Avatar,
    TableRow,
    TableBody,
    TableCell,
    Link,
    TableContainer,
    Box,
    IconButton,

} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useAuth from "../../hooks/useAuth";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch } from "react-redux";
import { deleteSingleCart, updateShoppingCart } from "./cartSlice";
import { fNumber } from "../../untils/numberFormat";


function CartsTable({ Carts }) {
    const { user } = useAuth();
    const dispatch = useDispatch();


    const handleClickIncrease = (id, amount) => {
        amount += 1;
        dispatch(updateShoppingCart(id, amount))
    }

    const handleClickDiminis = (id, amount) => {
        amount -= 1;
        if (amount === 0) { amount = 1 }
        dispatch(updateShoppingCart(id, amount))
    }

    const handleDeleteCart = (id) => {
        if (user)
            dispatch(deleteSingleCart(id))
    }


    return (
        //overflowX : tuy chinh khi mang hinh chieu ngang
        <Box sx={{}}>
            <TableContainer sx={{ minWidth: { sx: 320, md: 600 }, overflowX: "auto" }}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ width: { xs: -5, md: -2 }, fontWeight: 600 }}>
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                Product
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                Price
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                Amount
                            </TableCell>
                            <TableCell
                                sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}
                            >
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Carts.map((cart) => {
                            const { productName, price, _id } = cart.productId
                            const image = cart.productId.image[0]
                            return (
                                <TableRow key={cart._id} hover >
                                    <TableCell sx={{ alignItems: "center" }}>
                                        <Avatar
                                            alt={productName}
                                            src={image}
                                            sx={{ mr: -3, mb: 1 }}

                                        />

                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            display: { xs: "10%", md: "20%" },
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                    >

                                        <Link
                                            variant="subtitle2"
                                            sx={{ fontWeight: 600 }}
                                            component={RouterLink}
                                            to={`/products/${_id}`}
                                        >
                                            {productName}
                                        </Link>
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "10%", md: "20%", color: "red" } }}
                                    >
                                        {fNumber(price)}đ
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "15%", md: "20%" } }}
                                    >
                                        <Box sx={{ display: { xs: "flex", alignItems: "center" } }}>
                                            <IconButton size="small" onClick={() => { handleClickDiminis(cart._id, cart.amount) }}> <RemoveCircleIcon size="small" /></IconButton>
                                            {cart.amount}
                                            <IconButton size="small" onClick={() => { handleClickIncrease(cart._id, cart.amount) }}><AddCircleIcon size="small" /></IconButton>
                                        </Box>

                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "15", md: "20%" } }}
                                    >
                                        <IconButton onClick={() => { handleDeleteCart(cart._id) }}
                                            aria-label="delete" size="small">
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>


                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
}

export default CartsTable;
