import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from '../../Services/useFetch'

import cat1 from "../../assests/cat1.jpg";
import cat2 from "../../assests/cat2.jpg";
import cat3 from "../../assests/cat3.jpg";
import cat4 from "../../assests/cat4.jpg";
import cat5 from "../../assests/cat5.jpeg";
import styles from "./category.module.scss";
const imgurl = '/'

const Caterogry = () => {
  const navigate = useNavigate();
  const { getResponse, error, loading } = useFetch('/category');
 

  const handleClick = (item) => {
    let catName = item.name.replace(/\s+/g, '_');
    const url = `/products/${catName}`
    navigate(url)
  }

  return (
    <div className="pt-5 container">
       
      <div className={`${styles.categoryWrapper}`}>
        {getResponse?.map((Category, i) => {
          return (
            <div key={i}>
              <div
              onClick={() => handleClick(Category)}
                className="category"
                style={{
                  background: `linear-gradient(rgba(20,20,20, 0.3),rgba(20,20,20, .3)), url(${`${imgurl}cat${i + 1}.jpg`}) no-repeat`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h5 className="text-white px-3">
                  {Category.name.toUpperCase()}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Caterogry;
