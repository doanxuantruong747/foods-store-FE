import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
//import { PRODUCT_PER_PAGE } from "../../app/config";

// import { cloudinaryUpload } from "../../untils/cloudinary";
// import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  productById: {},
  currentPageProducts: [],
  selectedProduct: null
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { Products } = action.payload;

      Products.forEach((product) => {
        console.log(product)
        state.productById[product._id] = product;
        if (!state.currentPageProducts.includes(product._id))
          state.currentPageProducts.push(product._id);
      });


    },

    getSingleProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedProduct = action.payload;
    },

    resetProducts(state, action) {
      state.productById = {};
      state.currentPageProducts = [];
    },
  }
});


export default slice.reducer;

export const getProducts =
  ({ page, limit = 12, name }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, name, limit };
        if (name) params.name = name;

        const response = await apiService.get(`/products`, { params });
        if (page === 1) dispatch(slice.actions.resetProducts());
        dispatch(slice.actions.getProductSuccess(response.data));

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };


export const getSingleProducts =
  (id) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.get(`/products/${id}`);

        dispatch(slice.actions.getSingleProductSuccess(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };


