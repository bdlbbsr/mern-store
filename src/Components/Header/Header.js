import React, { useEffect } from "react";
import { selectError, selectLoggedInUser, selectUserChecked, checkAuth } from '../../Redux/features/Auth/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { signOutAsync } from '../../Redux/features/Auth/AuthSlice';
import { AiOutlineShoppingCart, AiOutlineUser, AiTwotoneHeart } from "react-icons/ai";
import Search from "../Search/Search"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(checkAuth);
  const { cart } = useSelector((state) => state.cart);

  const profileName = JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')) : ''

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}

    </a>
  ));

  const logout = () => {
    dispatch(
      signOutAsync(true)
    )
   
  }


  return (
    <div>


      <Navbar expand="lg" className={`${styles.navBar} fixed-top`}>
        <Container>
          <div className="logo order-0">  <NavLink to="/" className={`${styles.navLink} text-uppercase`}>
            My Store
          </NavLink> </div>
          <div className="searchBar order-2 order-md-1">
            <Search />
          </div>
          <div className={`${styles.rightIcons} order-1 order-md-2`}>

            <Dropdown className={styles.customDrupdown}>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <AiOutlineUser size={30} /> {profileName ? profileName.fname : ''}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} eventKey="1" className={styles.customDropItem} to="/account"> <span>Profile</span></Dropdown.Item>
                {isAuthenticated && <Dropdown.Item as={Link} eventKey="2" className={styles.customDropItem}><span onClick={logout}>Logout</span></Dropdown.Item>}
                {!isAuthenticated && <Dropdown.Item as={Link} eventKey="3" className={styles.customDropItem} to="/login"><span>Login</span></Dropdown.Item>}
                {profileName?.role == 'admin' && <Dropdown.Item as={Link} eventKey="3" className={styles.customDropItem} to="/admin/dashboard"><span>Admin Dashboard</span></Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>

            <NavLink
              to="/wishlist"
              className={`${styles.navLink} ${styles.cartIcon}`}
            >
              <AiTwotoneHeart size={30} />{" "}

            </NavLink>

            <NavLink
              to="/cart"
              className={`${styles.navLink} ${styles.cartIcon}`}
            >
              <AiOutlineShoppingCart size={25} />{" "}
              <div className={styles.cartLength}>
                <h6>{cart?.length}</h6>
              </div>
            </NavLink>
          </div>

        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

// <NavLink
//                 to="/about"
//                 className={`${styles.navLink} ${styles.menuLink}`}
//               >
//                 About Us
//               </NavLink>
//               <NavLink
//                 to="/wishlist"
//                 className={`${styles.navLink} ${styles.menuLink}`}
//               >
//                 Wishlist
//               </NavLink>
