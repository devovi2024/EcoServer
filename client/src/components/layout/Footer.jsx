import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaDiscord, FaShoppingBag, FaCcVisa, FaCcMastercard, FaCcPaypal, FaLock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#0f172a] text-gray-300 overflow-hidden">

      {/* ---------- Neon Animated Background ---------- */}
      <div className="absolute inset-0 flex justify-between opacity-10">
        <div className="w-1 h-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-400 animate-pulse-slow"></div>
        <div className="w-1 h-full bg-gradient-to-b from-green-400 via-yellow-300 to-red-400 animate-pulse-slow delay-200"></div>
        <div className="w-1 h-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-pink-500 animate-pulse-slow delay-400"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* ---------- Brand & Vision ---------- */}
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold text-white tracking-widest animate-pulse">OviStore</h2>
          <p className="text-gray-400">
            Bringing European elegance & African vibrance to your doorstep.  
            AI-curated deals, flash sales & immersive shopping experience.
          </p>
          <div className="flex gap-4 mt-4 text-gray-400">
            <FaFacebookF className="hover:text-blue-500 transition-all"/>
            <FaTwitter className="hover:text-cyan-400 transition-all"/>
            <FaInstagram className="hover:text-pink-500 transition-all"/>
            <FaLinkedin className="hover:text-blue-600 transition-all"/>
            <FaDiscord className="hover:text-purple-500 transition-all"/>
          </div>
        </div>

        {/* ---------- Quick Shop Links ---------- */}
        <div>
          <h3 className="text-white font-bold mb-4 border-b border-gray-600 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-cyan-400 hover:translate-x-2 transition-all">Home</a></li>
            <li><a href="/shop" className="hover:text-cyan-400 hover:translate-x-2 transition-all">Shop</a></li>
            <li><a href="/flash-sales" className="hover:text-cyan-400 hover:translate-x-2 transition-all">Flash Sales</a></li>
            <li><a href="/blog" className="hover:text-cyan-400 hover:translate-x-2 transition-all">Blog</a></li>
            <li><a href="/contact" className="hover:text-cyan-400 hover:translate-x-2 transition-all">Contact</a></li>
          </ul>
        </div>

        {/* ---------- Product Categories ---------- */}
        <div>
          <h3 className="text-white font-bold mb-4 border-b border-gray-600 pb-2">Categories</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2 hover:scale-105 hover:text-pink-400 transition-all"><FaShoppingBag/> <a href="/category/fashion">Fashion</a></li>
            <li className="flex items-center gap-2 hover:scale-105 hover:text-pink-400 transition-all"><FaShoppingBag/> <a href="/category/electronics">Electronics</a></li>
            <li className="flex items-center gap-2 hover:scale-105 hover:text-pink-400 transition-all"><FaShoppingBag/> <a href="/category/home">Home & Living</a></li>
            <li className="flex items-center gap-2 hover:scale-105 hover:text-pink-400 transition-all"><FaShoppingBag/> <a href="/category/groceries">Groceries</a></li>
            <li className="flex items-center gap-2 hover:scale-105 hover:text-pink-400 transition-all"><FaShoppingBag/> <a href="/category/sports">Sports</a></li>
          </ul>
        </div>

        {/* ---------- Newsletter & Deals ---------- */}
        <div>
          <h3 className="text-white font-bold mb-4 border-b border-gray-600 pb-2">Deals & Updates</h3>
          <p className="text-gray-400 mb-4">
            Subscribe for AI-curated deals, flash sales alerts & trending products.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email..."
              className="px-4 py-2 rounded-lg border border-gray-600 bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition text-white font-bold px-4 py-2 rounded-lg"
            >
              Subscribe
            </button>
          </form>

          {/* ---------- SSL / Payment Features ---------- */}
          <div className="mt-6 space-y-2">
            <h4 className="text-gray-300 font-semibold">Secure Payments</h4>
            <div className="flex gap-3 mt-2">
              <div className="flex items-center gap-1 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
                <FaCcVisa className="text-blue-500"/>
                <span className="text-sm text-gray-200">Visa</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
                <FaCcMastercard className="text-red-500"/>
                <span className="text-sm text-gray-200">Mastercard</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
                <FaCcPaypal className="text-blue-400"/>
                <span className="text-sm text-gray-200">PayPal</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
                <FaLock className="text-green-400"/>
                <span className="text-sm text-gray-200">SSL Secure</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 mt-6">Email: deals@ovistore.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
        </div>

      </div>

      {/* ---------- Bottom futuristic wave ---------- */}
      <div className="relative z-10 border-t border-gray-700 py-6 text-center text-gray-500 text-sm tracking-widest">
        © {new Date().getFullYear()} OviStore. Europe x Africa Fusion | AI-curated ecommerce experience. Secure Payments ✔️
      </div>

    </footer>
  );
};

export default Footer;
