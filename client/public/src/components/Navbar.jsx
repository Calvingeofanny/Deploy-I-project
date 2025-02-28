import { Link, NavLink, useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    Toastify({
      text: "Logout Success",
      duration: 3000,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    navigate("/");
  };

  return (
    <header className="bg-[#f53d2d]">
      {/* Top navbar */}
      <div className="bg-[#f53d2d] text-white py-1">
        <div className="container mx-auto px-4 flex justify-between text-xs">
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-80">
              Seller Centre
            </a>
            <a href="#" className="hover:opacity-80">
              Download
            </a>
            <div className="flex items-center space-x-1">
              <span>Follow us on</span>
              <a href="#" className="hover:opacity-80">
                <i className="fab fa-facebook mx-1"></i>
              </a>
              <a href="#" className="hover:opacity-80">
                <i className="fab fa-instagram mx-1"></i>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center hover:opacity-80">
              <i className="far fa-bell mr-1"></i>
              <span>Notifications</span>
            </a>
            <a href="#" className="flex items-center hover:opacity-80">
              <i className="far fa-question-circle mr-1"></i>
              <span>Help</span>
            </a>
            {localStorage.getItem("access_token") ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="hover:opacity-80">
                  <i className="fas fa-user-circle mr-1"></i>
                  Profile
                </Link>
                <button onClick={handleLogout} className="hover:opacity-80">
                  <i className="fas fa-sign-out-alt mr-1"></i>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:opacity-80">
                <i className="fas fa-user mr-1"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-[#f53d2d] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <h1
                onClick={() => navigate("/")}
                className="text-2xl font-bold text-white cursor-pointer mr-8"
              >
                C'books
              </h1>
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for books..."
                    className="w-full px-4 py-2 rounded-sm bg-white focus:outline-none"
                  />
                  <button className="absolute right-0 top-0 h-full px-6 bg-[#f53d2d] text-white">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <Link to="/transaction" className="text-white text-2xl">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
