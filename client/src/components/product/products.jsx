import ProductStore from "../../store/ProductStore";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";

const Products = () => {
  const { ListProduct, ListByProductRemarkRequest } = ProductStore();
  const remarks = ["new", "trending", "popular", "top", "special"];

  const [selectedRemark, setSelectedRemark] = useState("new");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await ListByProductRemarkRequest(selectedRemark);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedRemark, ListByProductRemarkRequest]);

  const handleChange = (e) => setSelectedRemark(e.target.value);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="flex gap-3 mb-6">
        {remarks.map((remark) => (
          <label key={remark} className="cursor-pointer">
            <input
              type="radio"
              name="remark"
              value={remark}
              className="hidden peer"
              onChange={handleChange}
              checked={selectedRemark === remark}
            />
            <span className="px-4 py-2 rounded-full font-semibold bg-gray-200 text-gray-700 peer-checked:bg-blue-500 peer-checked:text-white transition">
              {remark.charAt(0).toUpperCase() + remark.slice(1)}
            </span>
          </label>
        ))}
      </div>

      {loading && (
        <div className="text-center text-gray-500 text-lg py-20">
          Loading products...
        </div>
      )}

      {!loading && (!ListProduct || ListProduct.length === 0) && (
        <div className="text-center text-red-500 text-lg py-20">
          No products found
        </div>
      )}

      {!loading && ListProduct && ListProduct.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ListProduct.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={
                  item.img1 ||
                  "https://cdn.vectorstock.com/i/1000v/53/71/computer-hand-drawing-system-unit-and-keyboard-vector-20735371.avif"
                }
                alt={item.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10 text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {item.title}
                </h2>
                <div className="flex items-center gap-2 sm:gap-4 mt-2">
                  <span className="text-lg sm:text-xl font-bold text-blue-400">
                    ${item.discountedPrice}
                  </span>
                  <span className="line-through text-gray-300 text-sm sm:text-base">
                    ${item.price}
                  </span>
                </div>
                <div
                  className={`mt-2 text-sm sm:text-base font-medium ${
                    item.stock ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.stock ? "In Stock" : "Out of Stock"}
                </div>
                <button className="mt-3 px-3 sm:px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-md flex items-center gap-2 text-sm sm:text-base">
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
