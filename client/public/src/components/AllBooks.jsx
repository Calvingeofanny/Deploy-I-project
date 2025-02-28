import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/books/books-slice";
import { useEffect } from "react";
import Toastify from "toastify-js";
import gifLoading from "../assets/Pulse-1s-284px.svg";
import { useNavigate } from "react-router";

export default function AllBooks() {
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

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-[400px]">
        <img src={gifLoading} alt="loading" />
      </section>
    );
  }

  return (
    <div className="bg-[#f5f5f5] py-8">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <h3 className="text-[#f53d2d] font-medium mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1 text-sm border border-[#f53d2d] text-[#f53d2d] rounded hover:bg-[#fef6f5]">
              All Categories
            </button>
            <button className="px-4 py-1 text-sm border border-gray-200 rounded hover:border-[#f53d2d] hover:text-[#f53d2d]">
              Fiction
            </button>
            <button className="px-4 py-1 text-sm border border-gray-200 rounded hover:border-[#f53d2d] hover:text-[#f53d2d]">
              Non-Fiction
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {books?.map((book) => (
            <div
              key={book?.id}
              className="bg-white rounded shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={book?.image}
                  alt={book?.title}
                  className="w-full aspect-square object-cover"
                />
                {book?.Category?.name && (
                  <span className="absolute top-2 left-2 bg-[#ffd424] text-xs px-2 py-1 rounded">
                    {book?.Category?.name}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm text-gray-800 line-clamp-2 min-h-[40px]">
                  {book?.title}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[#f53d2d] text-lg font-medium">
                    ${book?.price}
                  </span>
                  <span className="text-xs text-gray-500">Sold 1.2k</span>
                </div>
                <button
                  onClick={() => navigate(`/detail/${book?.id}`)}
                  className="mt-3 w-full bg-[#f53d2d] text-white text-sm py-2 rounded hover:bg-[#d63122] transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
