import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Lottie from 'lottie-react';
import ImagePlaceholder from '../assets/image/image.json'; 

const FeaturesSkeleton = () => {
  const slides = 3; 

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {Array(slides)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex-shrink-0 w-56 flex flex-col gap-2">
            <div className="w-full h-36 rounded-lg overflow-hidden">
              <Lottie animationData={ImagePlaceholder} loop={true} />
            </div>

            <div className="flex flex-col gap-1">
              <Skeleton height={20} width="80%" />
              <Skeleton height={16} width="60%" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeaturesSkeleton;
