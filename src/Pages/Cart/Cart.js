import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import styles from "./cart.module.scss";
import { useForm } from "react-hook-form";
import usePost from "../../Services/usePost";
import useFetch from "../../Services/useFetch";
import {
  removeFromCart,
  removeAll,
  reduceProduct,
  incrementProduct,
} from "../../Redux/features/Cart/CartSlice";
import EmptyCart from "../../Components/EmptyCart/EmptyCart";
import { toast } from "react-toastify";
const addressapiUrl = "/saveAddress";
const Cart = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState();
  const [paymentData, setPaymentData] = useState();
  const [activeKey, setActiveKey] = useState("1");

  const [addNewAddess, setaddNewAddess] = useState(false);
  const [selectedAddess, setSelectedAddess] = useState();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const userDtl = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  const userId = userDtl.userId;
  const {
    createData,
    postResponse,
    error: postErr,
    loading: postLoad,
  } = usePost();
  const { getResponse, error, loading, responseCode } = useFetch(
    `/profile?userId=${userId}`
  );

  //calculate total price
  const totalPrice = products.cart.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );

  //remove product handler
  const removeProductHandler = (product) => {
    dispatch(removeFromCart(product));
    toast.warning(`${product.name.slice(0, 20)} is removed from cart`, {
      autoClose: 1000,
    });
  };

  //remove all product handler
  const removeAllProduct = () => {
    dispatch(removeAll());
    toast.error("Your Cart is now empty", {
      autoClose: 1000,
    });
  };

  // useForm hook
  const {
    register: paymentmethods,
    handleSubmit: paymentMethodSubmit,
    setValue: senderSetValue,
  } = useForm({
    defaultValues: {},
  });

  const {
    register: addressFields,
    handleSubmit: addressFieldsSubmit,
    setValue: receiverSetValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const saveAddress = (data) => {
    const updatedProfileData = {
      userId: userId,
      newAddress: data,
    };
    createData(addressapiUrl, updatedProfileData);
  };

  const handleCustomButtonClick = (action) => {
    return () => {
      // if action passed is 'next' we want to increment the activeKey so that
      // the next accordion in line opens and the current will automatically
      // close when the activeKey changes
      // run this operation only while the number is lower than 4(the
      // total number of accordions)

      if (action === "next" && Number(activeKey) < 4) {
        // in react, in the setState function we can pass a callback in which we
        // can access the value that needs to be updated

        setActiveKey((prevValue) => (Number(prevValue) + 1).toString());
      }

      // same here, run the operation only while activeKey is greater than the
      // first element value, so that we don't end up with negative values

      if (action === "prev" && Number(activeKey) > 1) {
        setActiveKey((prevValue) => (Number(prevValue) - 1).toString());
      }

      if (action === "next" && Number(activeKey) == 3) {
        // doPayment()
      }
    };
  };

  console.log("paymentData", paymentData?.payment);

  const goForPayment = () => {
    let orderData = {
      userId: userId,
      products: products.cart,
      totalAmount: totalPrice,
      status: "Pending",
      paymentDetails: {
        paymentMethod: paymentData?.payment,
        transactionId: "1234567890",
        paymentStatus: "Pending",
      },
      shippingAddress: {
        name: selectedAddess.name,
        mobile: selectedAddess.mobile,
        street: selectedAddess.street,
        postalCode: selectedAddess.postalCode,
      },
    };

    createData("/order", orderData);
    dispatch(removeAll());
    //localStorage.setItem("cart", []);

    // setTimeout(function () {
    //   alert("Order Placed successfully!")
    //   navigate('/')
    // }, 2000);
  };

  const onOptionChange = (e) => {
    setSelectedAddess(getResponse.addresses[e.target.value]);
  };

  if (!postResponse?.success == true && products.cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container className="containerWrapper">
      {postResponse?.success == true ? (
        <h4 className="text-center pt-5">
          Your Order placed successfully. Thank you!
        </h4>
      ) : (
        <Row>
          <Col
            xs={12}
            md={9}>
            <Accordion
              defaultActiveKey="10"
              activeKey={activeKey}
              onSelect={setActiveKey}>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Product Details</Accordion.Header>
                <Accordion.Body>
                  {products?.cart?.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className={styles.cartCard}>
                        <div>
                          <img
                            src={`https://mern-store-backend-sigma.vercel.app/${product.thumbnail}`}
                            alt="product"
                            width="50px"
                          />
                        </div>
                        <div>
                          <h5 style={{}}>{product.name.slice(0, 20)}</h5>
                        </div>
                        <div>
                          <h6>${product.price}</h6>
                        </div>
                        <div className="cartBtns">
                          <button
                            className={`${styles.cartBtn} fw-bold`}
                            onClick={() => dispatch(incrementProduct(product))}>
                            +
                          </button>
                          <h6>{product.quantity}</h6>
                          <button
                            className={`${styles.cartBtn} fw-bold`}
                            onClick={() => dispatch(reduceProduct(product))}>
                            -
                          </button>
                        </div>
                        <div>
                          <h6>
                            ${(product.price * product.quantity).toFixed(2)}
                          </h6>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              removeProductHandler(product);
                            }}>
                            remove
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="mb-5 d-flex justify-content-between">
                    <button
                      className={styles.cartBtn}
                      onClick={removeAllProduct}>
                      Remove All items
                    </button>

                    <Button
                      variant="primary"
                      onClick={handleCustomButtonClick("next")}>
                      Next
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Delivery Address</Accordion.Header>
                <Accordion.Body>
                  {userId ? (
                    <div>
                      {getResponse &&
                        getResponse.addresses.map((item, i) => (
                          <div key={i}>
                            <input
                              type="radio"
                              name="selectAddress"
                              value={i}
                              onChange={onOptionChange}
                            />{" "}
                            &nbsp; Name - {item.name} Mobile - {item.mobile}{" "}
                            <br />
                            Address- {item.street}
                            Postal Code - {item.postalCode}
                            <br />
                            <br />
                          </div>
                        ))}

                      <Button
                        variant="primary"
                        onClick={handleCustomButtonClick("prev")}>
                        Previous
                      </Button>

                      <Button
                        className="ms-4"
                        variant="primary"
                        onClick={handleCustomButtonClick("next")}
                        type="submit">
                        Next
                      </Button>
                    </div>
                  ) : (
                    <p>Login to select your delivery address</p>
                  )}

                  {/* <form key={1}
                    noValidate
                    onSubmit={addressFieldsSubmit((data) => { setFormData(data); handleCustomButtonClick("next") })}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className=" "
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...addressFields('name', {
                            required: 'Name is required'
                          })}
                          type="text"
                          className="d-block"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className=" "
                      >
                        Mobile
                      </label>
                      <div className="mt-2">
                        <input
                          id="mobile"
                          {...addressFields('mobile', {
                            required: 'Mobile is required'

                          })}
                          type="text"
                          className="d-block"
                        />
                        {errors.mobile && (
                          <p className="text-red-500">{errors.mobile.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="pincode"
                        className=" "
                      >
                        Pincode
                      </label>
                      <div className="mt-2">
                        <input
                          id="pincode"
                          {...addressFields('pincode', {
                            required: 'Pincode is required'

                          })}
                          type="text"
                          className="d-block"
                        />
                        {errors.pincode && (
                          <p className="text-red-500">{errors.pincode.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className=" "
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="address"
                          {...addressFields('address', {
                            required: 'Address is required'

                          })}
                          type="text"
                          className="d-block"
                        />
                        {errors.address && (
                          <p className="text-red-500">{errors.address.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      
                      <Button variant="primary" onClick={handleCustomButtonClick("prev")} >
                        Previous
                      </Button>
                      <Button variant="primary" onClick={handleCustomButtonClick("next")} type="submit">
                        Next
                      </Button>
                    </div>
                  </form> */}

                  {addNewAddess && (
                    <form onSubmit={addressFieldsSubmit(saveAddress)}>
                      <div>
                        <label
                          htmlFor="name"
                          className=" ">
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            {...addressFields("name", {
                              required: "Name is required",
                            })}
                            type="text"
                            className="d-block"
                          />
                          {errors.name && (
                            <p className="text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="mobile"
                          className=" ">
                          Mobile
                        </label>
                        <div className="mt-2">
                          <input
                            id="mobile"
                            {...addressFields("mobile", {
                              required: "Mobile is required",
                            })}
                            type="text"
                            className="d-block"
                          />
                          {errors.mobile && (
                            <p className="text-red-500">
                              {errors.mobile.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="postalCode"
                          className=" ">
                          Pincode
                        </label>
                        <div className="mt-2">
                          <input
                            id="postalCode"
                            {...addressFields("postalCode", {
                              required: "postalCode is required",
                            })}
                            type="text"
                            className="d-block"
                          />
                          {errors.postalCode && (
                            <p className="text-red-500">
                              {errors.postalCode.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="street"
                          className=" ">
                          Address
                        </label>
                        <div className="mt-2">
                          <input
                            id="street"
                            {...addressFields("street", {
                              required: "street is required",
                            })}
                            type="text"
                            className="d-block"
                          />
                          {errors.street && (
                            <p className="text-red-500">
                              {errors.street.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <button type="submit">Save</button>
                      </div>
                    </form>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Payment Method</Accordion.Header>
                <Accordion.Body>
                  {selectedAddess ? (
                    <>
                      <form
                        key={2}
                        noValidate
                        onChange={paymentMethodSubmit((data) =>
                          setPaymentData(data)
                        )}>
                        <label htmlFor="creditCard">
                          <input
                            {...paymentmethods("payment", { required: true })}
                            type="radio"
                            value="creditcard"
                          />{" "}
                          &nbsp; Credit Card
                        </label>{" "}
                        <br />
                        <label htmlFor="debitCard">
                          <input
                            {...paymentmethods("payment", { required: true })}
                            type="radio"
                            value="debitCard"
                          />{" "}
                          &nbsp; Debit Card
                        </label>
                        <br />
                        <label htmlFor="cod">
                          <input
                            {...paymentmethods("payment", { required: true })}
                            // onChange={senderSetValue('testbdl')}
                            type="radio"
                            value="cod"
                          />{" "}
                          &nbsp; Cash On Delivery
                        </label>
                        <br />
                      </form>
                      <Button
                        className="mt-4"
                        variant="primary"
                        onClick={handleCustomButtonClick("prev")}>
                        Previous
                      </Button>
                      <Button
                        className="mt-4 ms-4"
                        variant="primary"
                        type="submit"
                        onClick={goForPayment}>
                        Place Order
                      </Button>
                    </>
                  ) : (
                    <p>Please select delivery address before payment</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col
            xs={12}
            md={3}
            className="">
            <h4>
              Total Price: <b>${totalPrice.toFixed(2)}</b>
            </h4>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
