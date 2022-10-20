import React, { useState } from "react";
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




function CartsTable({ cartCount, setCartCount }) {
    const [amountInput, setAmountInput] = useState(false)

    const { user } = useAuth();
    const dispatch = useDispatch();


    const handleClickIncrement = (id, amount) => {
        setAmountInput(false)
        setCartCount(
            cartCount.map((item) =>

                id === item._id
                    ? { ...item, amount: item.amount + 1 }
                    : item
            )
        )
        amount += 1;

        dispatch(updateShoppingCart(id, amount))
    }

    const handleClickDecrement = (id, amount) => {
        setAmountInput(false)
        setCartCount(
            cartCount.map((item) =>
                id === item._id
                    ? { ...item, amount: item.amount - (item.amount > 1 ? 1 : 0) }
                    : item
            )
        )
        amount -= (amount > 1 ? 1 : 0);

        dispatch(updateShoppingCart(id, amount))
    }

    const handleChange = (e, id) => {
        if (e.target.value > 20)
            e.target.value = 20

        const amount = e.target.value

        dispatch(updateShoppingCart(id, amount))
    }

    const handleDeleteCart = (id) => {
        if (user)
            dispatch(deleteSingleCart(id))
    }


    return (

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
                        {cartCount.map((cart) => {
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
                                            <IconButton size="small" onClick={() => { handleClickDecrement(cart._id, cart.amount) }}> <RemoveCircleIcon size="small" /></IconButton>


                                            {/* <FormProvider methods={methods} onSubmit={handleSubmit(handleChange)}> */}
                                            <Box onClick={() => { setAmountInput(true) }}>
                                                {amountInput === false

                                                    ? (<input style={{ textAlign: "center", width: "40px", height: "27px", borderRadius: "5px" }}
                                                        type="text"
                                                        name="amount"
                                                        id={cart._id}
                                                        value={cart.amount}
                                                    />)
                                                    : (<input style={{ textAlign: "center", width: "40px", height: "27px", borderRadius: "5px" }}
                                                        type="text"
                                                        onChange={(e) => { handleChange(e, cart._id) }}
                                                        name="amount"
                                                        id={cart._id}
                                                    />)
                                                }
                                            </Box>

                                            {/* </FormProvider> */}

                                            <IconButton size="small" onClick={() => { handleClickIncrement(cart._id, cart.amount) }}><AddCircleIcon size="small" /></IconButton>
                                        </Box>

                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "15", md: "20%" } }}
                                    >
                                        <IconButton onClick={(e) => { handleDeleteCart(cart._id) }}
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
