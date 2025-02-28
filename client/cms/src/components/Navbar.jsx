import { useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    Toastify({
      text: "Logout Success",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#ee4d2d",
      },
    }).showToast();
    navigate("/login");
  };

  return (
    <header className="bg-[#ee4d2d] sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-white cursor-pointer flex items-center"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              C'Books Admin
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="text-white flex items-center">
              <i className="far fa-user-circle mr-2"></i>
              <span>Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors flex items-center"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
