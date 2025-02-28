import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./views/Home";
import BaseLayout from "./views/BaseLayout";
import Login from "./views/Login";
import EditBook from "./views/EditBook";
import AddBook from "./views/AddBook";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
