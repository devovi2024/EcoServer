import React from "react";

const DetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="w-full h-[380px] bg-gray-200 rounded-lg mb-4"></div>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => <div key={i} className="w-20 h-16 bg-gray-200 rounded-md"></div>)}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="h-6 bg-gray-200 w-3/4 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 w-1/2 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 w-1/3 rounded mb-4"></div>
            <div className="h-20 bg-gray-200 w-full rounded mb-6"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
              <div className="h-7 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-10 w-full bg-gray-200 rounded"></div>)}
            <div className="flex gap-4 pt-4">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
