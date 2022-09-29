import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"
import sliderReducer from "../features/slider/sliderSlice"
import userReducer from "../features/user/userSlice"

const rootReducer = {

    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    slider: sliderReducer,
    user: userReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;