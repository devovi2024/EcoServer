import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import BrandSkeliton from "../../skeleton/brandsSkeleton";
import { FaArrowRight } from "react-icons/fa";

const Brands = () => {
  const { BrandList, BrandListRequest } = ProductStore();

  useEffect(() => {
    if (!BrandList || BrandList.length === 0) {
      BrandListRequest?.(); 
    }
  }, [BrandList, BrandListRequest]);

  if (!BrandList) return <BrandSkeliton />;

  if (BrandList.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 font-semibold text-lg">
        No brands available
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-yellow-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-700 tracking-wide">
            Top Brands
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {BrandList.map((item) => (
            <Link
              to={`/by-brand/${item._id}`}
              key={item._id}
              className="flex flex-col items-center p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 mb-3 flex items-center justify-center rounded-full bg-orange-50">
                <img
                  src={item.BrandImg || "https://via.placeholder.com/100"}
                  alt={item.brandName || "Brand"}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </div>
              <p className="text-center text-sm sm:text-base font-semibold text-gray-700">
                {item.brandName || "Unnamed Brand"}
              </p>
            </Link>
          ))}

          <div className="col-span-full flex justify-center mt-4">
            <Link
              to="/brands" // safer than /by-brand/:id
              className="flex items-center gap-1 text-orange-600 font-medium hover:text-orange-800 transition-colors duration-300"
            >
              Explore All <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
