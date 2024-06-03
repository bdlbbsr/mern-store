import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiTwotoneHeart,
  AiOutlineFileSearch
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkAuth, signOutAsync } from "../../Redux/features/Auth/AuthSlice";
import Search from "../Search/Search";
import styles from "./header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(checkAuth);
  const { cart } = useSelector((state) => state.cart);

  const profileName = JSON.parse(localStorage.getItem("auth"))
    ? JSON.parse(localStorage.getItem("auth"))
    : "";

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}>
      {children}
    </a>
  ));

  const logout = () => {
    dispatch(signOutAsync(true));
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="topBar fixed-top">
        <Container>
          <div className="logo order-0">
            <NavLink
              to="/"
              className="navLinkStl text-uppercase">
              My Store
            </NavLink>
          </div>
          <div className="searchBar order-2 order-md-1 hideforsm">
            <Search />
          </div>
          <div className="rightIcons order-1 order-md-2">

          

            <Dropdown className="customDrupdown">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components">
                <AiOutlineUser size={30} />{" "}
                {profileName ? profileName.fname : ""}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isAuthenticated && (
                  <Dropdown.Item
                    as={Link}
                    eventKey="1"
                    className="customDropItem"
                    to="/account">
                    <span>Profile</span>
                  </Dropdown.Item>
                )}
                {isAuthenticated && (
                  <Dropdown.Item
                    as={Link}
                    eventKey="2"
                    className="customDropItem">
                    <span onClick={logout}>Logout</span>
                  </Dropdown.Item>
                )}
                {!isAuthenticated && (
                  <Dropdown.Item
                    as={Link}
                    eventKey="3"
                    className="customDropItem"
                    to="/login">
                    <span>Login</span>
                  </Dropdown.Item>
                )}
                {profileName?.role == "admin" && (
                  <Dropdown.Item
                    as={Link}
                    eventKey="3"
                    className="customDropItem"
                    to="/admin/dashboard">
                    <span>Admin Dashboard</span>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <NavLink
              to="/wishlist"
              className="navLinkStl cartIcon">
              <AiTwotoneHeart size={30} />{" "}
            </NavLink>

            <NavLink
              to="/cart"
              className="navLinkStl cartIcon">
              <AiOutlineShoppingCart size={25} />{" "}
              <div className="cartLength">
                <h6>{cart?.length}</h6>
              </div>
            </NavLink>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
