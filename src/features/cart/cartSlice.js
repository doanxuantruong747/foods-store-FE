import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCT_PER_PAGE } from "../../app/config";

// import { cloudinaryUpload } from "../../untils/cloudinary";
// import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  carts: [],
  productId: {},
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

    getCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.carts = action.payload;

    },

    addShoppingCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const newCart = action.payload;
      // if (state.carts.length % PRODUCT_PER_PAGE === 0)
      //   state.carts.pop();
      state.productId[newCart._id] = newCart;
    },


  }
});


export default slice.reducer;

export const getShoppingCart =
  ({ page, limit = PRODUCT_PER_PAGE }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = {
          page: page,
          limit: limit,
        };
        const response = await apiService.get(`/carts`, {
          params,
        });
        dispatch(slice.actions.getCartSuccess(response.data));

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };


export const addShoppingCart =
  ({ productId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await apiService.post("/carts", {
        productId
      })

      dispatch(slice.actions.addShoppingCartSuccess(response))
      dispatch(getShoppingCart(response))
      toast.success("Add Shopping Cart successfully");

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };


export const updateShoppingCart =
  (id, amount) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await apiService.put(`/carts/${id}`, {
        amount
      })
      dispatch(getShoppingCart(response))
      toast.success("Update Shopping Cart successfully");

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };

export const deleteSingleCart =
  (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await apiService.delete(`/carts/${id}`)
      dispatch(getShoppingCart(response))
      toast.success("Delete Single Cart successfully");

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };

