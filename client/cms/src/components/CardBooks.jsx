import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/books/books-slice";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import gifLoading from "../assets/Pulse-1s-284px.svg";
import { baseUrl } from "../api/baseUrl";

export default function CardBooks() {
  const { books, loading, error } = useSelector((state) => state.booksReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAsync());
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

  const handleDelete = async (id) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: baseUrl + `/books/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);

      dispatch(fetchAsync());

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (e, id) => {
    try {
      const file = e.target.files[0];

      // console.log(file, "ini loh");

      if (!file) return;

      let formData = new FormData();
      formData.append("file", file);

      const { data } = await axios({
        method: "PATCH",
        url: baseUrl + `/books/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: formData,
      });

      dispatch(fetchAsync());

      Toastify({
        text: `${data.message}`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: `${error.response.data.message}`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        },
      }).showToast();
    }
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-[400px]">
        <img src={gifLoading} alt="loading" />
      </section>
    );
  }

  return (
    <div className="bg-[#f6f6f6] p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Table Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-[#222]">Book List</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ee4d2d]"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books?.map((book) => (
            <div
              key={book?.id}
              className="bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={book?.image}
                  alt={book?.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-[#ee4d2d] text-white px-2 py-1 text-xs rounded">
                  {book?.Category?.name}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-[#222] line-clamp-1 mb-2">
                  {book?.title}
                </h3>
                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <p className="flex items-center">
                    <i className="fas fa-user mr-2 w-4"></i>
                    {book?.developer}
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-calendar mr-2 w-4"></i>
                    {new Date(book?.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/edit-book/${book?.id}`)}
                    className="flex-1 bg-[#ee4d2d] text-white py-2 rounded hover:bg-[#d73211] transition-colors text-sm"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book?.id)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    <i className="fas fa-trash mr-1"></i> Delete
                  </button>
                </div>

                <div className="mt-3">
                  <input
                    type="file"
                    id={`uploadFile${book?.id}`}
                    className="hidden"
                    onChange={(e) => handleUpload(e, book?.id)}
                    accept="image/*"
                  />
                  <label
                    htmlFor={`uploadFile${book?.id}`}
                    className="block text-center bg-gray-50 text-[#ee4d2d] border border-[#ee4d2d] py-2 rounded cursor-pointer hover:bg-gray-100 transition-colors text-sm"
                  >
                    <i className="fas fa-camera mr-1"></i> Change Image
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
