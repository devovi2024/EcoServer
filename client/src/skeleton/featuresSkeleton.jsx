// src/featuresSkeleton/index.jsx
import React from "react";

const FeaturesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="h-20 w-20 bg-gray-300 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2" />
          <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
        </div>
      ))}
    </div>
  );
};

export default FeaturesSkeleton;
