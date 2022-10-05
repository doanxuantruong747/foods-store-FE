import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../untils/cloudinary";
//import { PRODUCT_PER_PAGE } from "../../app/config";



const initialState = {
  isLoading: false,
  error: null,

  productById: {},
  currentPageProducts: [],
  selectedProduct: null,
  totalProduct: 0,

  currentPageProductsUser: [],
  totalProductCurrent: 0,

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

      const { Products, count } = action.payload;

      Products.forEach((product) => {
        state.productById[product._id] = product;
        if (!state.currentPageProducts.includes(product._id))
          state.currentPageProducts.push(product._id);
      });

      state.totalProduct = count;
    },

    getProductCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { Products, count } = action.payload;

      state.currentPageProductsUser = Products

      state.totalProductCurrent = count;
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

    deleteProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.currentPageProductsUser.shift();

    },

    updataProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

    },

    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProduct = action.payload;

      state.currentPageProductsUser.unshift(newProduct);
      state.currentPageProducts.unshift(newProduct._id);
    },
  }
});


export default slice.reducer;

export const createProduct =
  ({ productName, foods, price, priceSale, unit, rating, image, describe }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {

        const imageUrl = await cloudinaryUpload(image);
        const response = await apiService.post("/products", {
          productName, foods, price, priceSale, unit, rating, describe,
          image: imageUrl,
        });
        dispatch(slice.actions.createProductSuccess(response.data));
        toast.success("Create Product successfully");

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };


export const getProducts =
  ({ page = 1, limit = 12, name }) =>
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

export const getProductsCurrentUser =
  ({ id, page, limit = 10, name }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, name, limit };
        if (name) params.name = name;

        const response = await apiService.get(`/products/${id}`, { params });
        if (page === 1) dispatch(slice.actions.resetProducts());
        dispatch(slice.actions.getProductCurrentUserSuccess(response.data));

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
        const response = await apiService.get(`/products/detail/${id}`);

        dispatch(slice.actions.getSingleProductSuccess(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const EditProduct =
  ({ id, productName, foods, price, priceSale, unit, image, describe, userId, page }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const data = { productName, foods, price, priceSale, unit, image, describe }

        if (image instanceof File) {
          const imageUrl = await cloudinaryUpload(image);
          data.image = imageUrl;
        }

        const response = await apiService.put(`/products/${id}`, data);
        dispatch(slice.actions.updataProductSuccess(response.data))
        toast.success("Edit product success");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };



export const deleteProduct =
  (id) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.delete(`/products/${id}`);
        dispatch(slice.actions.deleteProductSuccess(response.data));

        toast.error("delete success");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

