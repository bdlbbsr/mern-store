import React from "react";
import Caterogry from "../../Components/Category/Caterogry";
import Trending from "../../Components/Trending/Trending";
import HomeSlider from "../../Components/Slider/Slider";
import styles from "./home.scss";

const Home = () => {
  
  return (
    <div>
      <HomeSlider />
      <Caterogry />
      <Trending />
    </div>
  );
};

export default Home;
