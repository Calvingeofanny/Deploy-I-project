import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../api/baseUrl";

const initialState = {
  books: [],
  loading: false,
  error: "",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.books = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.books = [];
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchPending, fetchSuccess, fetchReject } = booksSlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios({
      method: "GET",
      url: baseUrl + "/books",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    // console.log("Data dari API:", data);
    dispatch(fetchSuccess(data.books));
  } catch (error) {
    // console.error("Error fetching games:", error);
    dispatch(fetchReject(error.message));
  }
};

export default booksSlice.reducer;
