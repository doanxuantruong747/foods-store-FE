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
  page: 1,

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
