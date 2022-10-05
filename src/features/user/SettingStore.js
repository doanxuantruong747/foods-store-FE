import React, { useCallback } from "react";
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { fData } from "../../untils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile, updateUserSellerProfile } from "./userSlice";



const UpdateUserSchema = yup.object().shape({
    shopName: yup.string().required("Name is required"),
    phone: yup.number().transform(value => (isNaN(value) ? undefined : value)).required("phone is required"),
});

function SettingStore() {

    const dispatch = useDispatch();

    const { user } = useAuth();
    const isLoading = useSelector((state) => state.user.isLoading);


    const defaultValues = {
        shopName: user?.shopName || "",
        phone: user?.phone || "",
        logoUrl: user?.logoUrl || "",
        address: user?.address || "",
        company: user?.company || "",
        city: user?.city || "",
        country: user?.country || "",
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });
    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;



    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    "logoUrl",
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    const onSubmit = (data) => {
        dispatch(updateUserSellerProfile({ userId: user._id, ...data }));
        dispatch(getCurrentUserProfile())
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Typography variant="h5" sx={{ fontSize: { xs: 16, md: 28 }, fontWeight: 600, mb: 2 }} >
                Setting Store
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
                        <FUploadAvatar
                            name="logoUrl"
                            accept="image/*"
                            maxSize={3145728}
                            onDrop={handleDrop}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 2,
                                        mx: "auto",
                                        display: "block",
                                        textAlign: "center",
                                        color: "text.secondary",
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(3145728)}
                                </Typography>
                            }
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
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
                            <FTextField name="shopName" label="Shop Name" />
                            <FTextField name="phone" label="Phone" />

                            <FTextField name="company" label="Company" />
                            <FTextField name="address" label="Address" />

                            <FTextField name="city" label="City" />
                            <FTextField name="country" label="country" />

                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isSubmitting || isLoading}
                            >
                                Save Changes
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}

export default SettingStore;
