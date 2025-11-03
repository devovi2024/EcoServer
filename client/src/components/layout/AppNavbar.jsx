import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaRegUser } from "react-icons/fa";
import ProductStore from "../../store/ProductStore";
import UserStore from "../../store/UserStore";

const AppNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { SetSearchKeyword, SearchKeyword } = ProductStore();
  const { isLogin, UserLogoutRequest } = UserStore();

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    SetSearchKeyword(value);
    if (value.trim()) navigate(`/by-keyword/${encodeURIComponent(value)}`);
  };

  const handleLogout = async () => {
    await UserLogoutRequest();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">OviBazaar</Link>

        <div className="flex flex-wrap items-center gap-6">
          {links.map(link => (
            <Link key={link.name} to={link.path} className="text-gray-700 hover:text-blue-600 font-medium">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            value={SearchKeyword || ""}
            onChange={handleSearch}
            className="w-full md:w-96 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="text-gray-600 hover:text-blue-600 text-xl"><FaHeart /></Link>
          <Link to="/cart" className="text-gray-600 hover:text-blue-600 text-xl relative">
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            <FaShoppingCart />
          </Link>
          {isLogin ? (
            <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600 text-xl flex items-center gap-1"><FaRegUser /> Logout</button>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-blue-600 text-xl"><FaRegUser /></Link>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 text-2xl md:hidden">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {menuOpen && (
          <div className="w-full bg-gray-100 border-t border-gray-200 px-4 py-4 flex flex-col gap-3 mt-2">
            {links.map(link => (
              <Link key={link.name} to={link.path} className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <input
              type="text"
              placeholder="Search products..."
              value={SearchKeyword || ""}
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded-full px-3 py-2 mt-2"
            />
            {isLogin ? (
              <button onClick={handleLogout} className="text-left text-red-600">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
