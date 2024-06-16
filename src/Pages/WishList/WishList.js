import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { removeAll } from "../../Redux/features/wishlist/WishListSlice";
import noitem from "../../assests/noitem.svg";
import styles from "./wishlist.scss";

const WishList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist);
  const content =
    products?.wishList?.length > 0 ? (
      products?.wishList?.map((product) => {
        return <ProductCard key={product?._id} product={product} />;
      })
    ) : (
      <Container className="containerWrapper text-center">
        <img src={noitem} alt="wishlist empty" height={300} />

        <h3>There are no Items in your wish list</h3>
      </Container>
    );

  return (
    <Container className="containerWrapper">
      <div className='wishListWrapper'>
        <h2 className="text-center py-3">My WishList</h2>
        <div
          className={
            products?.wishList?.length > 0 ? 'wishListItemWrapper' : ""
          }
        >
          {content}
        </div>
        {products?.wishList?.length > 0 && (
          <button
          className="wishListBtn"
            onClick={() => dispatch(removeAll())}
          >
            Remove all from Wishlist
          </button>
        )}
      </div>
    </Container>
  );
};

export default WishList;
