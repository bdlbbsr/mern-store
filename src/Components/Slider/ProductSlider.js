import React, { useLayoutEffect, useState } from "react";
import useFetchByCall from '../../Services/useFetchByCall';
import Loader from "../Loader/Loader";
import styles from "./slider.module.scss";
import ImageGallery from "react-image-gallery";
const api_base_URL = 'http://localhost:8080';

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
    original: api_base_URL + '/' + path,
    thumbnail: api_base_URL + '/' + path
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
              src={`${api_base_URL}/${props?.data?.thumbnail}`}
              alt="product-img"
              style={{ maxWidth: "100%", maxHeight: " " }}
            />
      }
      
    </div>
  );
};

export default React.memo(ProductSlider);
