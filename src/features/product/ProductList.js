import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './productSlice'
import { getSlider } from '../slider/sliderSlice'
import ProductCard from './ProductCard'
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import SearchInput from "../../components/searchInput/SearchInput";

import Slideshow from "../../components/sliderShow/SliderShow"


function ProductList() {
    const [filterName, setFilterName] = useState("");
    const [page, setPage] = useState(1);


    const { currentPageProducts, productById, isLoading } = useSelector((state) => state.product)

    const products = currentPageProducts.map((product) => productById[product]);

    const { sliderShows } = useSelector((state) => state.slider)
    const dispatch = useDispatch();

    const handleSubmit = (searchQuery) => {
        setFilterName(searchQuery.trim());
    };

    useEffect((name) => {
        name = filterName
        dispatch(getProducts({ page, name }));


    }, [page, filterName, dispatch]);

    useEffect(() => {
        dispatch(getSlider({ page }));
    }, [page, dispatch]);

    console.log(products)

    return (
        <>
            <Container >

                <Box sx={{ mt: 9, mb: 5, textAlign: "center" }}>
                    <SearchInput handleSubmit={handleSubmit} />
                </Box>

                <Box>
                    <Slideshow sliderShows={sliderShows}></Slideshow>
                </Box>

                {filterName
                    ? (<Typography sx={{ fontStyle: "italic" }}>Search by name: ({filterName} )</Typography>)
                    : (<Typography></Typography>)
                }

                <Grid container spacing={2} mt={1}>

                    {products.map((product) => (
                        <Grid key={product._id} item xs={6} md={4} lg={3}>
                            <ProductCard key={product._id} product={product} />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>

                    <LoadingButton
                        variant="outlined"
                        size="small"
                        loading={isLoading}
                        onClick={() => setPage((page) => page + 1)}
                    >
                        Load more
                    </LoadingButton>
                </Box>

                <Box sx={{ mb: 10 }}></Box>


            </Container>
        </>
    );
}

export default ProductList