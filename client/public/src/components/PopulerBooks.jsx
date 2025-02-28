import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import { baseUrl } from "../../api/baseUrl";

export default function PopulerBooks() {
  const [populerBook, setPopulerBook] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPopulerBook = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(baseUrl + "/ai");

      if (Array.isArray(data)) {
        setPopulerBook(data);
      } else {
        console.log("bukan array");
        setPopulerBook([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      fetchPopulerBook();
    } catch (error) {
      console.log(error, "handlegenerate");
    }
  };

  return (
    <>
      {/* Popular Books */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800 relative">
              Book Populer
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h2>
            <button
              onClick={handleGenerate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Generate
            </button>
          </div>
          <Link
            to="/books"
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-300"
          >
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {populerBook?.map((book) => (
                <div
                  key={book?.title}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={book?.image || "placeholder-image.jpg"}
                    alt={book?.title}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
                      {book?.title}
                    </h3>
                    <p className=" text-gray-600 mb-2 line-clamp-1">
                      {book?.developer}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {book?.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
