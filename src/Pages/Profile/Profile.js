import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import { Container, Row } from "react-bootstrap";
import { selectError, checkAuth } from "../../Redux/features/Auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import usePatch from "../../Services/usePatch";
import usePost from "../../Services/usePost";
import useFetch from "../../Services/useFetch";
import useFetchByCall from "../../Services/useFetchByCall";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const apiUrl = "/saveAddress";

const Profile = () => {
  const isAuthenticated = useSelector(checkAuth);
  const userDtl = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  const token = userDtl.token;
  const userId = userDtl.userId;
  const api = `https://mern-store-backend-sigma.vercel.app/api/profile?userId=${userId}`;
  const [formdata, setFormData] = useState();
  const [addNewAdd, setaddNewAdd] = useState(false);
  const { patchData, getPatchResponse, error, loading } = usePatch();
  const {
    createData,
    postResponse,
    error: postErr,
    loading: postLoad,
  } = usePost();
  const {
    getResponse,
    error: addErr,
    loading: addLoad,
    responseCode,
  } = useFetch(`/profile?userId=${userId}`);
  const {
    getResponse: ordersList,
    error: ordrrsErr,
    loading: ordersLoad,
  } = useFetch(`/order/${userId}`);
  const {
    getDataByCall,
    getResponseCall,
    error: callErr,
    loading: Callload,
  } = useFetchByCall();
  const [orderDetails, setOrderDetails] = useState("");

  // const getProfile = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow"
  //   };

  //   fetch(api, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
  // }

  // useEffect(() => {
  //   getProfile()
  // }, [])

  const {
    register: addressFields,
    handleSubmit: addressFieldsSubmit,
    setValue: receiverSetValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const saveAddress = (data) => {
    const updatedProfileData = {
      userId: userId,
      newAddress: data,
    };
    createData(apiUrl, updatedProfileData);
    reset();
    setaddNewAdd(false);
  };

  const getOrderDetails = async (id) => {
    getDataByCall(`/orderDeatsil/${id}`);

    // let data = await getAPI()
    // if (data.error) {
    //   console.log(data.message)
    // } else {
    //   setOrderDetails(data)

    // }
  };

  return (
    <>
      {!isAuthenticated ? (
        <p className="text-center">Please Login</p>
      ) : (
        <Container className="containerWrapper">
          <Row>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3">
              <Tab
                eventKey="home"
                title="Profile">
                Full Name - {getResponse?.user.firstName} &nbsp;{" "}
                {getResponse?.user.lastName}
                <br />
                Email - {getResponse?.user.email}
                <br />
                Gender - {getResponse?.gender}
                <br />
                State - {getResponse?.state}
                <br />
                City - {getResponse?.country}
              </Tab>
              <Tab
                eventKey="profile"
                title="Address">
                <button
                  className="btn btn-dark mb-5"
                  onClick={() => setaddNewAdd(true)}>
                  Add New Address
                </button>
                {getResponse &&
                  getResponse.addresses.map((item, i) => (
                    <div key={i}>
                      Name - {item.name} Mobile - {item.mobile} <br />
                      Address- {item.street}
                      Postal Code - {item.postalCode}
                      <br />
                      <br />
                    </div>
                  ))}

                {addNewAdd && (
                  <form onSubmit={addressFieldsSubmit(saveAddress)}>
                    <div>
                      <label
                        htmlFor="name"
                        className="mt-4 mb-1">
                        Name
                      </label>

                      <input
                        id="name"
                        {...addressFields("name", {
                          required: "Name is required",
                        })}
                        type="text"
                        className="inputBox"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className="mt-4 mb-1">
                        Mobile
                      </label>

                      <input
                        id="mobile"
                        {...addressFields("mobile", {
                          required: "Mobile is required",
                        })}
                        type="text"
                        className="inputBox"
                      />
                      {errors.mobile && (
                        <p className="text-red-500">{errors.mobile.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="mt-4 mb-1">
                        Pincode
                      </label>

                      <input
                        id="postalCode"
                        {...addressFields("postalCode", {
                          required: "postalCode is required",
                        })}
                        type="text"
                        className="inputBox"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="street"
                        className="mt-4 mb-1">
                        Address
                      </label>

                      <input
                        id="street"
                        {...addressFields("street", {
                          required: "street is required",
                        })}
                        type="text"
                        className="inputBox"
                      />
                      {errors.street && (
                        <p className="text-red-500">{errors.street.message}</p>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="sbtBtn">
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </Tab>
              <Tab
                eventKey="contact"
                title="Orders">
                <h3>Orders</h3>
                {ordersList &&
                  ordersList.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => getOrderDetails(item?._id)}>
                      <strong>Order Id -</strong> {item._id} &nbsp;&nbsp;
                      <strong>Order Date -</strong>{" "}
                      {item.createdAt.substring(0, 10)}
                      <br />
                      <strong>Total Amount -</strong> {item.totalAmount}{" "}
                      &nbsp;&nbsp;
                      <strong>Status -</strong> {item.status}
                      <br />
                      <br />
                      <div
                        key={i}
                        style={{
                          display:
                            item?._id == getResponseCall?._id
                              ? "block"
                              : "none",
                        }}>
                        <strong>Order Id -</strong> {item._id} &nbsp;&nbsp;
                        <strong>Order Date -</strong>{" "}
                        {item.createdAt.substring(0, 10)}
                        <br />
                        <strong>Total Amount -</strong> {item.totalAmount}{" "}
                        &nbsp;&nbsp;
                        <strong>Status -</strong> {item.status} <br />
                        <strong>Payment Method -</strong>{" "}
                        {item.paymentDetails.paymentMethod} &nbsp;&nbsp;
                        <strong>Payment Status -</strong>{" "}
                        {item.paymentDetails.paymentStatus}
                        <br />
                        <strong>Products -</strong>{" "}
                        {item.products.map((item) => (
                          <div>
                            Name - {item.name} &nbsp;&nbsp; Price - {item.price}
                          </div>
                        ))}
                        <br />
                        <br />
                      </div>
                    </div>
                  ))}
              </Tab>
            </Tabs>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Profile;
