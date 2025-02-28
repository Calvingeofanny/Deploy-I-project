import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Toastify from "toastify-js";

export default function BaseLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      Toastify({
        text: "You must be logged in to view this page",
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
