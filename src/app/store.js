import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"
import sliderReducer from "../features/slider/sliderSlice"

const rootReducer = {

    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    slider: sliderReducer
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;