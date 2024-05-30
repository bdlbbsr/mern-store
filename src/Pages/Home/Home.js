import React from "react";
import Caterogry from "../../Components/Category/Caterogry";
import Trending from "../../Components/Trending/Trending";
import HomeSlider from "../../Components/Slider/Slider";
import styles from "./home.module.scss";
import useFetch from '../../Services/useFetch'

const Home = () => {
  const { getResponse, error, loading } = useFetch('/home-slider');
  // console.log("getResponse", getResponse)
  return (
    <div className={styles.mainWrapper}>
      <HomeSlider images={getResponse?.data}/>
      <Caterogry />
      <Trending />
    </div>
  );
};

export default Home;
