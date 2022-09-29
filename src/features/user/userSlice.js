import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../untils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },
  },
});

export default slice.reducer;


export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const updateUserProfile =
  ({
    userId,
    name,
    avataUrl,
    address,
    city,
    country,
    phone
  }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const data = {
          name,
          avataUrl,
          address,
          city,
          country,
          phone
        };
        if (avataUrl instanceof File) {
          const imageUrl = await cloudinaryUpload(avataUrl);
          data.avataUrl = imageUrl;
        }
        const response = await apiService.put(`/users/buyer/${userId}`, data);
        dispatch(slice.actions.updateUserProfileSuccess(response.data));

        toast.success("Update Profile successfully");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const updateUserSellerProfile =
  ({
    userId,
    shopName,
    logoUrl,
    address,
    phone,
    company,
    city,
    country
  }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const data = {
          shopName,
          logoUrl,
          address,
          phone,
          company,
          city,
          country
        };
        if (logoUrl instanceof File) {
          const imageUrl = await cloudinaryUpload(logoUrl);
          data.logoUrl = imageUrl;
        }
        const response = await apiService.put(`/users/seller/${userId}`, data);
        dispatch(slice.actions.updateUserProfileSuccess(response.data));

        toast.success("Update Profile Seller successfully");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };