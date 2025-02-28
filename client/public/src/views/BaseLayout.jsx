import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BaseLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
