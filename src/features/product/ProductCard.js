import React from "react";
import {
    Card,
    Stack,
    CardMedia,
    Typography,
    CardContent,
    CardActionArea,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { fNumber } from "../../untils/numberFormat";



function ProductCard({ product }) {
    const navigate = useNavigate();
    const img = product.image[0]
    return (

        <Card onClick={() => navigate(`/products/${product._id}`)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" noWrap >
                        {product.productName}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        {product.priceSale && (
                            <Typography
                                component="span"
                                sx={{ color: "text.disabled", textDecoration: "line-through" }}
                            >
                                {fNumber(product.priceSale)}
                            </Typography>
                        )}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {fNumber(product.price)} đ
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}

export default ProductCard