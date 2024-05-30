import Form from 'react-bootstrap/Form';
import { Container, Button } from "react-bootstrap";
import styles from "../admin.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate  } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container className="containerWrapper">
      
       <div>
        <ul>
         <li><NavLink to="/admin/add-product">  Add Product </NavLink></li>
         <li><NavLink to="/admin/add-category">  Add Category </NavLink></li>
         <li><NavLink to="/admin/add-brand">  Add Brand </NavLink></li>
         <li><NavLink to="/admin/addAbout">  Add About </NavLink></li>
         <li><NavLink to="/admin/addHomeSlider">  Add Home Slider </NavLink></li>
         <li><NavLink to="/admin/users">  Users </NavLink></li>
         </ul>
       </div>
 
    </Container>

  )

}

export default Dashboard;