import React from 'react';
import Button from '@mui/material/Button';
import { FormProvider, FSelect } from "../../components/form"

import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getOrdersSeller, UpdateOrder } from './orderSlice';
import useAuth from '../../hooks/useAuth';




const UpdateStatusSchema = yup.object().shape({
    status: yup.string().required("productName is required"),
});

export default function FormUpdateStatusOrder({ orderCurrent, handleClose }) {

    const { isLoading } = useSelector((state) => state.order);

    const { user } = useAuth();
    const userId = user._id
    const id = orderCurrent.orderId
    const defaultValues = {
        status: orderCurrent?.status || ""
    }

    const methods = useForm({
        resolver: yupResolver(UpdateStatusSchema),
        defaultValues,
    });

    const { handleSubmit,

        formState: { isSubmitting },
    } = methods;

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const { status } = data
        const page = 1
        dispatch(UpdateOrder({ id: id, status: status }));
        setTimeout(() => {
            dispatch(getOrdersSeller({ page, userId }))
        }, 500);

    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Grid item xs={12} md={12}>
                <Typography sx={{ mb: 2 }}>codeID: ({orderCurrent.orderId})</Typography>
                <FSelect name="status" label="status" size="small" sx={{ xs: 200, md: 300 }} >
                    {[
                        { value: "", label: "" },
                        { value: "preparing goods", label: "preparing goods" },
                        { value: "shipping to you", label: "shipping to you" },
                        { value: "complete", label: "complete" },
                    ].map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </FSelect>

            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                    sx={{}}
                    onClick={handleClose}
                    type="submit"

                    loading={isSubmitting || isLoading}
                >
                    Save
                </LoadingButton>

                <Button onClick={handleClose}>Cancel</Button>
            </Box>
        </FormProvider>



    );
}
