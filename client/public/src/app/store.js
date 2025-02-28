// disini kita akan membuat storenya dan memasang reducer dari slice yang kita buat
import { configureStore } from "@reduxjs/toolkit";
import books from "../features/books/books-slice";

export default configureStore({
  reducer: {
    booksReducer: books,
  },
});
