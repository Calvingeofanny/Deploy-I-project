import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/Login";
import Register from "./views/Register";
import BaseLayout from "./views/BaseLayout";
import Books from "./views/Books";
import Purchase from "./views/Purchase";
import Profile from "./views/Profile";
import Transaction from "./views/Transaction";
import Home from "./views/Home";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/detail/:id" element={<Purchase />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transaction" element={<Transaction />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
