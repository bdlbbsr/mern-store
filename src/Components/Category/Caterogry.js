import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from '../../Services/useFetch';
import useFetchByCall from '../../Services/useFetchByCall';
import { useQuery } from '@tanstack/react-query';

import cat1 from "../../assests/cat1.jpg";
import cat2 from "../../assests/cat2.jpg";
import cat3 from "../../assests/cat3.jpg";
import cat4 from "../../assests/cat4.jpg";
import cat5 from "../../assests/cat5.jpg";
import styles from "./category.scss";
const imgurl = '/'

 
const fetchCategories = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/category`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Caterogry = () => {
  const navigate = useNavigate();
  const { getResponse, error, loading } = useFetch('/api/category');
  const { getDataByCall, getResponseCall, errora, loadinga } = useFetchByCall();

  const { data, errorb, isLoading } = useQuery({
    queryKey: ["cat"],
    queryFn: fetchCategories,
  });
  
  // const { data } = useQuery({
  //   queryKey: ["cat"],
  //   queryFn: () => {
  //     return Axios.get("https://mern-store-backend-sigma.vercel.app/api/category").then((res) => res.data);
  // }})

  const handleClick = (item) => {
    let catName = item.name.replace(/\s+/g, '_');
    const url = `/products/${catName}`
    navigate(url)
  }

  return (
    <div className="pt-5 container">
       
      <div className='categoryWrapper'>
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

export default React.memo(Caterogry);
