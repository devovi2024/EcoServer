import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import ProductStore from "../../store/ProductStore";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { SetSearchKeyword, SearchKeyword } = ProductStore();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    SetSearchKeyword(value);

    if (value.trim() !== "") {
      navigate(`/by-keyword/${encodeURIComponent(value)}`);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#2c3e50] via-[#34495e] to-[#1abc9c] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 flex-wrap">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-300">OviBazaar</Link>

        {/* Links + Search + Icons */}
        <div className="flex flex-1 items-center justify-between flex-wrap mt-2 md:mt-0">

          {/* Links */}
          <ul className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-200 font-semibold">
            <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/blog" className="hover:text-yellow-400 transition">Blog</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>

          {/* Search */}
          <div className="flex-1 mx-4">
            <input
              type="text"
              value={SearchKeyword || ""}
              onChange={handleSearchChange}
              placeholder="Search for crafts, clothes..."
              className="w-full px-4 py-2 border border-[#f1c40f] bg-[#34495e] text-yellow-100 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-200"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="hover:text-yellow-300 text-xl text-gray-200 transition"><FaHeart /></Link>
            <Link to="/cart" className="hover:text-yellow-300 text-xl relative text-gray-200 transition">
              <FaShoppingCart />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </Link>
            <Link to="/login" className="hover:text-yellow-300 text-xl text-gray-200 transition"><FaUser /></Link>

            {/* Hamburger */}
            <button
              className="text-yellow-200 text-2xl focus:outline-none md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="w-full bg-[#2c3e50] text-yellow-200 px-4 py-4 mt-2">
            <input
              type="text"
              value={SearchKeyword || ""}
              onChange={handleSearchChange}
              placeholder="Search for crafts, clothes..."
              className="w-full px-3 py-2 mb-3 rounded-full bg-[#34495e] text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-200"
            />
            <ul className="flex flex-col gap-4 font-semibold">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
