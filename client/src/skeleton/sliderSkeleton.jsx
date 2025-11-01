import React from "react";

const SliderSkeleton = () => {
  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row bg-white rounded-md shadow-sm overflow-hidden animate-pulse"
            >
              <div className="md:w-1/2 p-4 flex flex-col justify-center space-y-3">
                <div className="h-5 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-16 bg-gray-300 rounded"></div>
                  <div className="h-8 w-20 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="md:w-1/2 h-32 md:h-40 bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SliderSkeleton;
