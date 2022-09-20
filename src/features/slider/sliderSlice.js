import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCT_PER_PAGE } from "../../app/config";


const initialState = {
  isLoading: false,
  error: null,
  sliderShows: [],
};

const slice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getSliderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.sliderShows = action.payload;

    },


  }
});


export default slice.reducer;

export const getSlider =
  ({ page, limit = PRODUCT_PER_PAGE }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, limit };
        const response = await apiService.get(`/sliders`, { params });

        dispatch(slice.actions.getSliderSuccess(response.data.Sliders));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };


