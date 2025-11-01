import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "../components/product/product-image";
import ProductStore from "../store/ProductStore";
import DetailsSkeleton from "../skeleton/DetailsSkeleton";
import parse from "html-react-parser";
import Reviews from '../components/product/review-list';

const Details = () => {
  const { id } = useParams();
  const { Details, ProductDetailsRequest, ProductReviewListRequest } = ProductStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specification");

  useEffect(() => {
    if (id) {
      ProductDetailsRequest(id);
      ProductReviewListRequest(id);
    }
  }, [id, ProductDetailsRequest, ProductReviewListRequest]);

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (!Details) return <DetailsSkeleton />;
  const product = Details.productDetails;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-5 md:p-8 bg-white rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center bg-gray-50 p-4 rounded-xl shadow-inner">
          <ProductImage images={product} />
        </div>

        <div className="flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{Details.title}</h1>
            <div className="flex flex-wrap gap-3 text-gray-500 text-sm">
              <span><span className="font-semibold text-gray-700">Category:</span> {Details.categories?.categoryName}</span>
              <span><span className="font-semibold text-gray-700">Brand:</span> {Details.brands?.brandName}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{Details.shortDescription}</p>
          </div>

          <div className="flex items-center gap-3 text-xl md:text-2xl font-bold">
            {Details.discount > 0 && <span className="text-gray-400 line-through text-base md:text-lg">৳{Details.price}</span>}
            <span className="text-green-600">৳{Details.discountedPrice}</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
                  <option value="">{product?.size}</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
                  <option value="">{product?.color}</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-full overflow-hidden">
                  <button className="w-10 h-10 flex justify-center items-center text-gray-600 hover:text-black font-bold" onClick={decrementQuantity}>-</button>
                  <input type="text" readOnly value={quantity} className="w-full text-center bg-transparent font-medium text-gray-800" />
                  <button className="w-10 h-10 flex justify-center items-center text-gray-600 hover:text-black font-bold" onClick={incrementQuantity}>+</button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition transform hover:scale-105">Add to Cart</button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-xl transition transform hover:scale-105">Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-5xl mx-auto">
        <div className="flex border-b border-gray-300 mb-4">
          <button className={`px-4 py-2 font-medium transition ${activeTab === "specification" ? "border-b-2 border-green-600 text-green-600" : "text-gray-500 hover:text-green-600"}`} onClick={() => setActiveTab("specification")}>Specification</button>
          <button className={`px-4 py-2 font-medium transition ${activeTab === "review" ? "border-b-2 border-green-600 text-green-600" : "text-gray-500 hover:text-green-600"}`} onClick={() => setActiveTab("review")}>Review</button>
        </div>

        <div className="text-gray-700">
          {activeTab === "specification" && <div className="prose prose-green max-w-full">{parse(product?.description || "No specification available.")}</div>}
          {activeTab === "review" && <Reviews />}
        </div>
      </div>
    </div>
  );
};

export default Details;
