import { Link } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import ProductSkeliton from "../../skeleton/productsSkeleton";

const ProductList = ({ brandID, remark }) => {
  const { ListProduct } = ProductStore();
  let products = (brandID || remark) ? ListProduct || [] : [];

  if (!products || products.length === 0) return <ProductSkeliton />;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((item) => {
            let priceDisplay = item.discount && item.discount !== "false" ? (
              <p className="text-sm text-gray-500 line-through">${item.price}</p>
            ) : null;

            return (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col hover:shadow-xl transition-shadow"
              >
                <Link to={`/details/${item._id}`} className="flex flex-col">
                  <div className="w-full h-40 flex items-center justify-center mb-3 bg-orange-50 rounded-lg">
                    <img
                      src={item.img1 || "https://via.placeholder.com/150"}
                      alt={item.title || "Product"}
                      className="object-contain max-h-36"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate">
                    {item.title || "Unnamed Product"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {item.shortDescription || ""}
                  </p>
                  <div className="flex items-center gap-2">
                    {priceDisplay}
                    <p className="text-lg font-bold text-orange-600">
                      ${item.discountedPrice || item.price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
