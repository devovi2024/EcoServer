import React from "react";

const FeaturesSkeleton = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md"
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-300 rounded mb-2 animate-pulse"></div>
              <div className="h-3 w-32 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSkeleton;
