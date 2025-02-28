import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gifLoading from "../assets/Pulse-1s-284px.svg";
import Toastify from "toastify-js";
import { fetchCategoriesAsync } from "../features/categories/categories-slice";
import { baseUrl } from "../../api/baseUrl";

export default function AddBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [developer, setDeveloper] = useState("");
  const [image, setImage] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const { categories, loading, error } = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: baseUrl + "/books",
        data: {
          title,
          price,
          developer,
          image,
          CategoryId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // console.log(data);

      Toastify({
        text: `${data.message}`,
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
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Toastify({
        text: `${error}`,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }, [error]);

  if (loading) {
    return (
      <>
        <section className="flex justify-center items-center">
          <img src={gifLoading} />
        </section>
      </>
    );
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo and Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Add New Book</h2>
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {/* Add Book Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Book Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  {" "}
                  Title{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter book title"
                  />
                </div>
              </div>

              {/* Book Price */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  {" "}
                  Price{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter book title"
                  />
                </div>
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="author"
                    name="author"
                    type="text"
                    required
                    onChange={(e) => setDeveloper(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter book developer"
                  />
                </div>
              </div>
              {/* Category */}
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                  {" "}
                  Category{" "}
                </label>
                <div className="mt-1">
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={CategoryId || "DEFAULT"}
                    required
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="DEFAULT" disabled hidden>
                      Select a category
                    </option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Game Image */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  {" "}
                  Image Url{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    required
                    onChange={(e) => setImage(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter game image url"
                  />
                </div>
              </div>
              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
