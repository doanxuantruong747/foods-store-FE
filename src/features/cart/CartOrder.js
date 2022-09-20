import React from "react";
import { Box, Typography, TextField, Divider } from "@mui/material";
import { fNumber } from "../../untils/numberFormat";
import { useDispatch } from "react-redux";
import { createOder } from "../order/orderSlice";
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import { deleteSingleCart } from "./cartSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from '@mui/lab';


const infoSchema = Yup.object().shape({
  addressShiping: Yup.string().required("AddressShiping is required"),
  phone: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required("Phone is required"),

});

const defaultValues = {
  addressShiping: "",
  phone: ""
}

function CartOrder({ carts }) {
  const { user } = useAuth();

  const navigate = useNavigate()
  let Carts = carts.Carts

  const userName = Carts[0].author.name

  let sum = 0;
  let totalSum = 0;
  let priceShiping = 20000;
  let products = []

  Carts.map((item) => {
    products = [...products, {
      name: item.productId.productName,
      price: item.productId.price,
      amount: item.amount,
      sum: (item.productId.price) * (item.amount),
      sellerId: item.productId.author,
      cartId: item._id
    }];
    sum = (item.productId.price) * (item.amount);
    totalSum += sum;
    return totalSum;
  })

  const methods = useForm({
    resolver: yupResolver(infoSchema),
    defaultValues
  })
  const {
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const handleConfirmtionOder = async (data) => {

    await dispatch(createOder(
      {
        name: userName,
        addressShiping: data.addressShiping,
        phone: data.phone,
        products: products,
        priceShiping: priceShiping,
        total: totalSum,
        userId: user._id
      }));
    setTimeout(() => {
      navigate("/order")
    }, 500);

    products.forEach((item) => {
      if (item.amount !== 0)
        dispatch(deleteSingleCart(item.cartId))
    })
  }


  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(handleConfirmtionOder)}>
      <Typography sx={{ fontSize: 13, mb: 1 }}> Name:
        {userName || (<TextField variant="standard" ></TextField>)}
      </Typography>


      <Typography sx={{ fontSize: 13, mb: 2 }}> Address Shiping:
        <FTextField variant="standard" name="addressShiping"

        ></FTextField>
      </Typography>

      <Typography sx={{ fontSize: 13, mb: 3 }}> Phone:
        <FTextField variant="standard" name="phone"

        ></FTextField>
      </Typography>

      {Carts.map((item) => {
        if (item.amount === 0) return null;
        return (
          <Box key={item._id}>
            <Typography sx={{ fontSize: 13, mb: 2, fontWeight: 600, }}>Product: {item.productId.productName}</Typography>

            <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <span>Price:</span>
              <span >{fNumber(item.productId.price)} đ </span>
            </Typography>

            <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <span>Amount:</span>
              <span>{item.amount}</span>
            </Typography>

            <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <span>Sum:</span>
              <span> {fNumber(sum = (item.productId.price) * (item.amount))} đ </span>
            </Typography>

            <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

          </Box>)
      }

      )}

      <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
        <span>Price Shiping:</span>
        <span> {(sum > 0) ? fNumber(priceShiping) : (priceShiping = 0)} đ </span>
      </Typography>

      <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

      <Typography sx={{ mb: 2, fontSize: 20, color: "red", fontWeight: 600, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
        <span>Total:</span>
        <span> {fNumber(totalSum = totalSum + priceShiping)} đ</span>
      </Typography>

      <Typography sx={{ fontStyle: "italic", fontSize: 12, fontWeight: 300 }}>
        (Pay the money when receiving the goods)
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <LoadingButton fullWidth size="small" type="submit" variant="contained"
          loading={isSubmitting}
        > Confirmation
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default CartOrder;
