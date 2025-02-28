// disini kita akan membuat storenya dan memasang reducer dari slice yang kita buat
import { configureStore } from "@reduxjs/toolkit";
import books from "../features/books/books-slice";
import categories from "../features/categories/categories-slice";

export default configureStore({
  reducer: {
    booksReducer: books,
    categoriesReducer: categories,
  },
});
