import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCT_PER_PAGE } from "../../app/config";

// import { cloudinaryUpload } from "../../untils/cloudinary";
// import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  ordersSeller: [],
  page: 1,
  totalOrders: null

};

const slice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    addOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;


      state.orders = action.payload;



    },

    getOrderSellerSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { ordersSeller, countCurent } = action.payload
      state.ordersSeller = ordersSeller;
      state.totalOrders = countCurent
    },

    updateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;


    },

  }
});


export default slice.reducer;

export const createOder =
  ({ name, addressShiping, phone, products, priceShiping, total, userId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await apiService.post("/orders", {
        name, addressShiping, phone, products, priceShiping, total, userId
      })

      dispatch(slice.actions.addOrderSuccess(response))

      toast.success("Order successfully");

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };


export const getOrders =
  ({ page, limit = PRODUCT_PER_PAGE }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, limit };
        const response = await apiService.get(`/orders`, {
          params,
        });
        dispatch(slice.actions.getOrderSuccess(response.data.orders));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const getOrdersSeller =
  ({ page, limit = PRODUCT_PER_PAGE, userId, status }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, limit, status };
        if (status) params.status = status;
        const response = await apiService.get(`/orders/seller`, {
          params, userId
        });

        dispatch(slice.actions.getOrderSellerSuccess(response.data
        ));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const UpdateOrder =
  ({ id, status }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {

        const response = await apiService.put(`/orders/${id}`, { status });
        dispatch(slice.actions.updateOrderSuccess(response.data))
        toast.success("Update Status order success");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };
