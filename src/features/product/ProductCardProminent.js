
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



function ProductCardProminent({ product }) {

    const navigate = useNavigate();
    const img = product.image[0]

    return (

        <Card onClick={() => navigate(`/products/${product._id}`)} sx={{ fontSize: { xs: 10 }, }}>
            <CardActionArea  >
                <CardMedia
                    sx={{ height: { xs: 130, md: 200, lg: 200 }, }}
                    component="img"
                    image={img}
                    alt="green iguana"
                />
                <CardContent sx={{ height: { xs: 90 }, mt: { xs: -2 } }}>
                    <Typography gutterBottom variant="body1" component="div" noWrap sx={{ fontSize: { xs: 12 } }}>
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
                                sx={{ color: "text.disabled", textDecoration: "line-through", fontSize: { xs: 13 } }}
                            >
                                {fNumber(product.priceSale)}
                            </Typography>
                        )}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: 13 } }}>
                            {fNumber(product.price)} đ
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}

export default ProductCardProminent