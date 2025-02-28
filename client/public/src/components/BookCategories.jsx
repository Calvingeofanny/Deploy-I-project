import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../../api/baseUrl";

export default function BookCategories() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(1);
  const navigate = useNavigate();

  const fetchBooks = async (categoryId) => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + `/pub/books/${categoryId}`,
      });
      // console.log("Fetched data:", data);
      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <>
      {/* Book Categories */}
      <section className="container mx-auto px-4 py-12 bg-white shadow-lg rounded-xl">
        {/* Category Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-8 py-3 ${activeCategory === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} rounded-full font-semibold hover:bg-blue-700 hover:text-white transition-colors`}
            onClick={() => handleCategoryClick(1)}
          >
            <i className="fas fa-desktop mr-2" />
            Fiction
          </button>
          <button
            className={`px-8 py-3 ${activeCategory === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} rounded-full font-semibold hover:bg-blue-700 hover:text-white transition-colors`}
            onClick={() => handleCategoryClick(2)}
          >
            <i className="fas fa-mobile-alt mr-2" />
            Non-Fiction
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading...</div>
          ) : (
            books.map((book) => (
              <div key={book.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow group text-center">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img src={book.image || "https://via.placeholder.com/150"} alt={book.title} className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{activeCategory === 1 ? "Fiction" : "Non-Fiction"}</div>
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{book.developer}</p>
                <button onClick={() => navigate(`/detail/${book?.id}`)} className="text-sm bg-blue-100 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-200 transition-colors">
                  Purchase
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
