import React from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  const menus = [
    {
      name: "Home",
      id: 1,
      path: "/",
    },
    {
      name: "About Us",
      id: 2,
      path: "/about",
    },
  ];
  return (
    <div className='footer'>
      <Container className='footerCnr'>
        <Nav
          className="my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll>
          {menus.map((menu) => (
            <NavLink
              to={menu.path}
              key={menu.id}
              className='navLink menuLink'>
              {menu.name}
            </NavLink>
          ))}
        </Nav>

        <div>Copyright © {year} - My Store</div>
      </Container>
    </div>
  );
};

export default Footer;
