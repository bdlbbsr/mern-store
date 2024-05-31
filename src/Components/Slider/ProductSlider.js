import React, { useLayoutEffect, useState } from "react";
import useFetchByCall from '../../Services/useFetchByCall';
import Loader from "../Loader/Loader";
import styles from "./slider.scss";
import ImageGallery from "react-image-gallery";
 

const ProductSlider = (props) => {
  const { getDataByCall, getResponseCall, error, loading } = useFetchByCall();
  const [categories, setCategories] = useState()

  const galleryImages = props?.data?.images;

  //   for (let item of galleryImages) {
  //   sliderItems.push(
  //     {
  //       caption: '',
  //       original: item.image,
  //       thumbnail: item.image
  //     }
  //   )
  // }

  const transformedArray = galleryImages?.map((path) => ({
    caption: '',
    original: process.env.REACT_APP_API_BASE_URL + '/' + path,
    thumbnail: process.env.REACT_APP_API_BASE_URL + '/' + path
  })) || [];


  return (
    <div className="image-gallery-wrapper">
      {transformedArray.length > 0 ?
      <ImageGallery items={transformedArray}
      showFullscreenButton={true}
      autoPlay={true}
      showThumbnails={true}
      thumbnailPosition='left'
      showPlayButton={false}
      showBullets={false}
      showIndex={false}
      showNav={true}
    />
    
    :
    <img
              src={`${process.env.REACT_APP_API_BASE_URL}/${props?.data?.thumbnail}`}
              alt="product-img"
              style={{ maxWidth: "100%", maxHeight: " " }}
              loading="lazy"
            />
      }
      
    </div>
  );
};

export default React.memo(ProductSlider);
