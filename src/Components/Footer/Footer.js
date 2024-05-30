import React from "react";
import styles from "./footer.module.scss";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  const menus = [
    {
      name: "Home",
      id: 1,
      path: "/",
    },
    // {
    //   name: "Products",
    //   id: 5,
    //   path: "/products",
    // },
    {
      name: "About Us",
      id: 2,
      path: "/about",
    },
    // {
    //   name: "Privacy",
    //   id: 3,
    //   path: "/",
    // },
    // {
    //   name: "Contact",
    //   id: 4,
    //   path: "/",
    // },
  ];
  return (
    <div className={styles.footer}>
<Container className={styles.footerCnr}>
<Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {menus.map((menu) => (
                <NavLink
                  to={menu.path}
                  key={menu.id}
                  className={`${styles.navLink} ${styles.menuLink}`}
                >
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
