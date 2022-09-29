import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { FormProvider, FSelect, FTextField, FUploadImage } from "../../components/form"

import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { EditProduct, getProductsCurrentUser } from './productSlice';
import useAuth from "../../hooks/useAuth";


const UpdateProductSchema = yup.object().shape({
    productName: yup.string().required("productName is required"),
    foods: yup.string().required("foods is required"),
    price: yup.number().required("price is required"),
    unit: yup.string().required("unit is required"),
    describe: yup.string().required("describe is required"),
});

export default function FormEditProductDialog({ product, handleClose }) {
    const { isLoading } = useSelector((state) => state.product);

    const id = product._id
    const { user } = useAuth();

    const defaultValues = {
        productName: product?.productName || "",
        foods: product?.foods || "",
        price: product?.price || "",
        priceSale: product?.priceSale || "",
        unit: product?.unit || "",
        image: product?.image?.[0] || null,
        describe: product?.describe || "",
    }


    const methods = useForm({
        resolver: yupResolver(UpdateProductSchema),
        defaultValues,
    });

    const { handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = methods;

    const dispatch = useDispatch();

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setValue(
                    "image",
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    const onSubmit = (data) => {
        const page = 1
        dispatch(EditProduct({ id, ...data, }));
        dispatch(getProductsCurrentUser({ id: user._id, page }))
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <FUploadImage
                        name="image"
                        accept="image/*"
                        maxSize={3145728}
                        onDrop={handleDrop}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: "grid",
                                rowGap: 3,
                                columnGap: 2,
                                gridTemplateColumns: {
                                    xs: "repeat(1, 1fr)",
                                    sm: "repeat(2, 1fr)",
                                },
                            }}
                        >

                            <FTextField name="productName" label="Product Name" />
                            <FSelect name="foods" label="Foods" size="small" sx={{ xs: 200, md: 300 }} >
                                {[
                                    { value: "Processing", label: "Processing" },
                                    { value: "Unprocessed", label: "Unprocessed" },
                                    { value: "Vegetable", label: "Vegetable" },
                                ].map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </FSelect>
                            {/* <FTextField name="foods" label="Foods" /> */}

                            <FTextField name="price" label="Price" />
                            <FTextField name="priceSale" label="Price Sale" />

                            <FTextField name="unit" label="unit" />

                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <FTextField name="describe" multiline label="describe" />
                        </Stack>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                    sx={{}}
                    onClick={handleClose}
                    type="submit"

                    loading={isSubmitting || isLoading}

                >
                    Save Changes
                </LoadingButton>

                <Button onClick={handleClose}>Cancel</Button>
            </Box>
        </FormProvider >



    );
}
