import React, { useState } from "react";
import {
    Table,
    TableHead,
    Avatar,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    Box,
    IconButton,
} from "@mui/material";
//import { Link as RouterLink } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { fNumber } from "../../untils/numberFormat";
import { deleteProduct } from "./productSlice";
import ProductEdit from "./ProductEdit";


function ProductTable({ products }) {
    const [open, setOpen] = useState(false);
    const [productCurrent, setProductCurrent] = useState([]);
    const { user } = useAuth();
    const dispatch = useDispatch();


    const handleDeleteProduct = (id) => {
        if (user._id)
            dispatch(deleteProduct(id))
    }

    const handleClickOpen = (product) => {
        setProductCurrent(product);
        setOpen(true)

    };

    return (

        //overflowX : tuy chinh khi mang hinh chieu ngang
        <Box sx={{ mt: 5 }}>

            <ProductEdit productCurrent={productCurrent} setOpen={setOpen} open={open} />

            <TableContainer sx={{ minWidth: { sx: 320, md: 650 }, overflowX: "auto" }}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ width: { xs: -5, md: -2 }, fontWeight: 600 }}>
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                Product
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                foods
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                Price
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                priceSale
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                unit
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }}>
                                Edit
                            </TableCell>
                            <TableCell sx={{ width: { xs: "10%", md: "25%" }, fontWeight: 600 }} >
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {products.map((product) => {
                            const { productName, foods, price, priceSale, unit, _id } = product
                            const image = product.image[0]
                            return (

                                <TableRow key={product._id}  >

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
                                    > {productName}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "10%", md: "20%" } }}
                                    >
                                        {foods}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "10%", md: "20%", color: "red" } }}
                                    >
                                        {fNumber(price)}đ
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "10%", md: "20%", color: "red" } }}
                                    >
                                        {fNumber(priceSale)}đ
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "15%", md: "20%" } }}
                                    >
                                        {unit}
                                    </TableCell>


                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "15", md: "20%" } }}
                                    >

                                        <IconButton onClick={() => { handleClickOpen(product) }}
                                            aria-label="edit" size="small">
                                            <BorderColorIcon fontSize="small" />

                                        </IconButton>

                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ display: { xs: "15", md: "20%" } }}
                                    >
                                        <IconButton onClick={() => {
                                            handleDeleteProduct(_id)
                                        }}
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

export default ProductTable;
