import { useNavigate } from "react-router";

export default function ButtonAddBook() {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 mb-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-[#222]">Book Management</h2>
        <button
          onClick={() => navigate("/add-book")}
          className="bg-[#ee4d2d] text-white px-6 py-2 rounded hover:bg-[#d73211] transition-colors flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Add New Book</span>
        </button>
      </div>
    </div>
  );
}
