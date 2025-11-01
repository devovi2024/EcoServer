import React from 'react';
import ProductStore from '../../store/ProductStore';

const Reviews = () => {
  const { ProductReviews } = ProductStore();

  if (!ProductReviews || ProductReviews.length === 0) {
    return <p className="text-gray-500">No reviews found.</p>;
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {ProductReviews.map((item, i) => (
          <li key={i} className="border border-gray-200 p-3 rounded-lg">
            <h6 className="font-semibold text-gray-800">{item.userName || "Anonymous"}</h6>
            <p className="text-gray-600 text-sm">{item.reviewText}</p>
            <span className="text-yellow-500 font-semibold">{`Rating: ${item.rating}/5`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
