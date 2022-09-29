import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    Container,
    Pagination,
    Stack,
    Typography,

} from "@mui/material";

import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "./ProductTable";
import SearchInput from "../../components/searchInput/SearchInput";
import { getProductsCurrentUser } from './productSlice'



function ProductStore() {
    let [filterName, setFilterName] = useState("");
    let [page, setPage] = useState(1);

    const { user } = useAuth();
    const dispatch = useDispatch();
    const { currentPageProductsUser, totalProductCurrent } = useSelector((state) => state.product)

    useEffect((name) => {
        name = filterName
        dispatch(getProductsCurrentUser({ id: user._id, page, name }))
    }, [page, dispatch, user._id, filterName])


    const handleSubmit = (searchQuery) => {
        setFilterName(searchQuery);
    };
    const handleChange = (even, value) => {
        setPage(value);
    };

    return (
        //overflowX : tuy chinh khi mang hinh chieu ngang
        <Container>
            <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
                My Product
            </Typography>
            <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
                        <SearchInput handleSubmit={handleSubmit} />

                        <Typography
                            variant="subtitle"
                            sx={{ color: "text.secondary", ml: 1 }}
                        >
                            {totalProductCurrent > 1
                                ? `${totalProductCurrent} products found`
                                : totalProductCurrent === 1
                                    ? `${totalProductCurrent} products found`
                                    : "No products found"}
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />

                        <Pagination
                            count={Math.ceil(totalProductCurrent / 10)}
                            page={page} onChange={handleChange} />
                    </Stack>
                    <ProductTable products={currentPageProductsUser} />
                </Stack>
            </Card>
        </Container>
    );
}

export default ProductStore;
