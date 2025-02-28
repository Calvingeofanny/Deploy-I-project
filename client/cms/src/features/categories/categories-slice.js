import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

const initialState = {
  categories: [],
  loading: false,
  error: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.categories = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.categories = [];
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchPending, fetchSuccess, fetchReject } = categoriesSlice.actions;

export const fetchCategoriesAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios({
      method: "GET",
      url: baseUrl + "/categories",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    // console.log("Data dari API:", data);
    dispatch(fetchSuccess(data.categories));
  } catch (error) {
    // console.error("Error fetching categories:", error);
    dispatch(fetchReject(error.message));
  }
};

export default categoriesSlice.reducer;
