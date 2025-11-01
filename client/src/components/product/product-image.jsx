import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductImage = ({ images }) => {
  const galleryImages = [
    { original: images?.img1, thumbnail: images?.img1 },
    { original: images?.img2, thumbnail: images?.img2 },
    { original: images?.img3, thumbnail: images?.img3 },
    { original: images?.img4, thumbnail: images?.img4 },
  ].filter(img => img.original); 

  return (
    <div className="w-full">
      <ImageGallery items={galleryImages} autoPlay={true} showPlayButton={false} />
    </div>
  );
};

export default ProductImage;
