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


    const { currentPageProducts, productById, isLoading, totalProduct } = useSelector((state) => state.product)

    let products = currentPageProducts.map((product) => productById[product]);

    const { sliderShows } = useSelector((state) => state.slider)
    const dispatch = useDispatch();

    const handleSubmit = (searchQuery) => {
        setPage(1);
        setFilterName(searchQuery);
    };

    useEffect((name) => {
        name = filterName
        dispatch(getProducts({ page, name }));

    }, [page, filterName, dispatch]);

    useEffect(() => {
        dispatch(getSlider({ page }));
    }, [page, dispatch]);

    return (
        <>
            {/* <Box sx={{
                mt: 8, mb: 5, textAlign: "center",
                position: "fixed",
                zIndex: 1, width: "100%", height: 80,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <SearchInput handleSubmit={handleSubmit} />
            </Box> */}
            <Container sx={{ mt: 12, mb: 15, textAlign: "center", }}>

                <Box sx={{ mb: 5 }}>
                    <SearchInput handleSubmit={handleSubmit} />
                </Box>

                <Box sx={{ mb: 5 }}>
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
                    {totalProduct ?
                        (<LoadingButton
                            variant="outlined"
                            size="small"
                            loading={isLoading}
                            onClick={() => setPage((page) => page + 1)}
                            disabled={Boolean(totalProduct) && products.length >= totalProduct}
                        >
                            Load more
                        </LoadingButton>)
                        : (<Typography variant="h6">No Products Yet</Typography>)
                    }

                </Box>

                <Box sx={{ mb: 10 }}></Box>


            </Container>
        </>
    );
}

export default ProductList