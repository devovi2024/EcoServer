import { Link } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import ProductSkeliton from "../../skeleton/productsSkeleton";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductList = ({ brandID, remark }) => {
  const {
    ListProduct,
    BrandList,
    BrandListRequest,
    CategoryList,
    CategoryListRequest,
    ListByFilterRequest,
  } = ProductStore();

  const [filter, setFilter] = useState({
    brandID: "",
    categoryID: "",
    priceMin: 0,
    priceMax: 2000,
  });

  const [loading, setLoading] = useState(false);

  // Fetch brands & categories on mount
  useEffect(() => {
    if (!BrandList) BrandListRequest();
    if (!CategoryList) CategoryListRequest();
  }, []);

  // Handle filter changes
  const handleFilterChange = async (field, value) => {
    const updatedFilter = { ...filter, [field]: value };
    setFilter(updatedFilter);

    const hasFilter = Object.values(updatedFilter).some(
      (v) => v !== "" && v !== 0
    );

    if (hasFilter) {
      setLoading(true);
      await ListByFilterRequest(updatedFilter);
      setLoading(false);
    }
  };

  // Decide products to show
  const products = brandID || remark ? ListProduct || [] : [];

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">

        {/* ===== Filter Sidebar ===== */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-20 h-[600px] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Filter Products
            </h2>

            {/* Brand */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">Brand</label>
              <select
                value={filter.brandID}
                onChange={(e) => handleFilterChange("brandID", e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Choose Brands</option>
                {BrandList?.map(({ _id, brandName }) => (
                  <option key={_id} value={_id}>{brandName}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">Category</label>
              <select
                value={filter.categoryID}
                onChange={(e) => handleFilterChange("categoryID", e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Choose Categories</option>
                {CategoryList?.map(({ _id, categoryName }) => (
                  <option key={_id} value={_id}>{categoryName}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex flex-col mb-6">
              <label className="text-gray-700 font-semibold mb-3">Price Range</label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-12 text-right">${filter.priceMin}</span>
                <div className="flex flex-col w-full gap-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filter.priceMin}
                    onChange={(e) => handleFilterChange("priceMin", Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg accent-orange-600 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filter.priceMax}
                    onChange={(e) => handleFilterChange("priceMax", Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg accent-orange-600 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-500 w-12 text-left">${filter.priceMax}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Product Grid ===== */}
        <div className="w-full md:w-3/4">
          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductSkeliton />
              </motion.div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => {
                  const { _id, img1, title, shortDescription, price, discountedPrice, discount } = p;
                  const hasDiscount = discount && discount !== "false";

                  return (
                    <motion.div
                      key={_id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl p-5 flex flex-col justify-between border border-gray-100 hover:-translate-y-1 transition-all"
                    >
                      {/* Link to product details */}
                      <Link to={`/details/${_id}`} className="flex flex-col">
                        <div className="relative w-full h-48 flex items-center justify-center bg-orange-50 rounded-xl overflow-hidden">
                          <img
                            src={img1 || "https://via.placeholder.com/150"}
                            alt={title || "Product"}
                            className="object-contain h-40 w-40 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="mt-4 space-y-1">
                          <h3 className="text-sm font-semibold text-gray-800 truncate">{title || "Unnamed Product"}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2">{shortDescription || ""}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          {hasDiscount && <p className="text-sm text-gray-400 line-through">${price}</p>}
                          <p className="text-lg font-bold text-orange-600">${discountedPrice || price}</p>
                        </div>
                      </Link>

                      {/* Add to Cart Button */}
                      <button className="mt-4 bg-orange-100 hover:bg-orange-600 hover:text-white text-orange-600 font-medium py-2 rounded-xl transition-all">
                        Add to Cart
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-400 mt-10"
              >
                No products found 😢
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
