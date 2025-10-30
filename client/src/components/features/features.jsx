import React, { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import FeaturesSkeleton from "../../skeleton/featuresSkeleton";

const Features = () => {
  const { FeaturesList, FeaturesListRequest } = ProductStore();

  useEffect(() => {
    if (!FeaturesList) {
      FeaturesListRequest();
    }
  }, [FeaturesList, FeaturesListRequest]);

  if (!FeaturesList) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <FeaturesSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {FeaturesList.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <img
                src={`/images/features/${item.image}`}
                alt={item.name}
                className="w-24 h-24 mx-auto mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
