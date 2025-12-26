import { Link } from "react-router-dom";

export default function Navbar({ openCart }) {
  return (
    <nav className="w-full py-5 px-8 flex justify-between items-center shadow-sm bg-white sticky top-0 z-50">
      {/* Logo → Landing */}
      <h1 className="text-2xl font-bold text-gray-900">
        <Link to="/">SnapShot 📸</Link>
      </h1>

      <div className="flex items-center gap-6 text-gray-700 font-medium">
        {/* Landing */}
        <Link to="/" className="hover:text-black">
          Home
        </Link>

        {/* Shop */}
        <Link to="/home" className="hover:text-black">
          Shop
        </Link>

        {/* Cart */}
        <button
          onClick={openCart}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Cart
        </button>
      </div>
    </nav>
  );
}
