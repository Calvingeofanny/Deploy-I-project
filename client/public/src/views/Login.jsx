import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { GoogleLogin } from "@react-oauth/google";
import { baseUrl } from "../../api/baseUrl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async (codeResponse) => {
    try {
      // console.log(codeResponse);

      const { data } = await axios({
        method: "POST",
        url: baseUrl + "/google-login",
        headers: {
          token: codeResponse.credential,
        },
      });
      // console.log(data);

      localStorage.setItem("access_token", data.access_token);

      Toastify({
        text: "Login Success",
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
    } catch (error) {
      console.error(error);
      Toastify({
        text: `${error.response.data.message}`,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: baseUrl + "/login",
        data: { email, password },
      });
      //   console.log(data);

      localStorage.setItem("access_token", data.access_token);

      Toastify({
        text: "Login Success",
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
    } catch (error) {
      console.error(error);
      Toastify({
        text: `${error.response.data.message}`,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  useEffect(() => {
    if (localStorage.access_token) {
      Toastify({
        text: "You already logged in",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md px-6 py-8 transform transition-all duration-300">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-3 animate-fade-in">C'books</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to your account</h2>
          <p className="text-gray-600">
            Or{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
              create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 hover:shadow-xl transition-shadow duration-300">
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-blue-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-blue-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors duration-200">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
