import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import CategorySkeleton from "../../skeleton/categoriesSkeleton";

const Categories = () => {
  const { CategoryList, CategoryListRequest } = ProductStore();

  useEffect(() => {
    if (!CategoryList || CategoryList.length === 0) {
      CategoryListRequest?.();
    }
  }, [CategoryList, CategoryListRequest]);

  if (!CategoryList) return <CategorySkeleton />;

  if (CategoryList.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 font-semibold text-lg">
        No categories available
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-gray-800 text-center">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {CategoryList.map((category) => (
            <Link
              to={`/by-category/${category._id}`}
              key={category._id}
              className="flex flex-col items-center text-center group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center bg-gradient-to-br from-teal-400 to-green-400 rounded-full shadow-md border border-gray-100 group-hover:shadow-lg transition-all">
                <img
                  src={category.categoryImage || "https://via.placeholder.com/40"}
                  alt={category.categoryName || "Category"}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-teal-700 transition-colors">
                {category.categoryName || "Unnamed Category"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
