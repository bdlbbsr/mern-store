import React, { useEffect } from "react";
import useFetch from "../../Services/useFetch";
import ImageGallery from "react-image-gallery";

import img1 from "../../assests/banner1.jpg";
import img2 from "../../assests/banner2.jpg";
import img3 from "../../assests/banner3.jpg";
import img4 from "../../assests/banner4.jpg";

const HomeSlider = (props) => {
  const { getResponse, error, loading } = useFetch("/api/home-slider");

  //  let sliderItemsa = []

  // let imgArray = Object.values(allbnr).map((item) => (
  //   {
  //     caption: item.caption,
  //     original: item.image,
  //     thumbnail: item.image
  //   }
  // ))

  // console.log("type", Array.isArray(allbnr) )

  // for (let item of getResponse) {
  //   sliderItemsa.push(
  //     {
  //       caption: item.caption,
  //       original: item.image,
  //       thumbnail: item.image
  //     }
  //   )
  // }

  // console.log(sliderItemsa)

  const sliderItems = [
    {
      id: 1,
      caption: "All the Lastest Product In One Place",
      original: img1,
      thumbnail: img1,
    },
    {
      id: 2,
      caption: "Grab the Lastest Product",
      original: img2,
      thumbnail: img2,
    },
    {
      id: 3,
      caption: "Find All Your Needs In One Place",
      original: img3,
      thumbnail: img3,
    },
    {
      id: 4,
      caption: "Offer on going",
      original: img4,
      thumbnail: img4,
    },
  ];

  function LeftArrowButton({ onClick }) {
    //handle function for when this button is clicked in here
    return (
      <svg
        fill="#000000"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 30.725 30.725">
        <g>
          <path
            d="M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731
		L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"
          />
        </g>
      </svg>
    );
  }

  function RightArrowButton({ onClick }) {
    //handle function for when this button is clicked in here
    return <svg> ... </svg>;
  }

  function FullScreenButton({ onClick, isFullscreen }) {
    //handle function for when this button is clicked in here, or when full screen is activated
    return <svg> ... </svg>;
  }

  return (
    <div className="image-gallery-wrapper">
      <ImageGallery
        items={sliderItems}
        showFullscreenButton={false}
        autoPlay={true}
        showThumbnails={false}
        showPlayButton={false}
        showBullets={true}
        showIndex={true}
        showNav={false}

        // renderLeftNav={(onClick, _disabled) => (
        //   <LeftArrowButton onClick={onClick} />
        // )}
        // renderRightNav={(onClick, _disabled) => (
        //   <RightArrowButton onClick={onClick} />
        // )}
        // renderFullscreenButton={(onClick, isFullscreen) => (
        //   <FullScreenButton onClick={onClick} isFullscreen={isFullscreen} />
        // )}
      />
    </div>
  );
};

export default React.memo(HomeSlider);
