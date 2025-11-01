import React from "react";

const CategoriesSkeleton = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-5 bg-white rounded-xl shadow-md"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 mb-3 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSkeleton;
