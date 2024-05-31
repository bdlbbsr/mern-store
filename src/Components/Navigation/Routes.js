import React, { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoutes'

import Login from "../../Pages/Auth/Login";
import ForgotPassword from "../../Pages/Auth/ForgotPassword"
import ResetPassword from "../../Pages/Auth/ResetPassword"
import Signup from "../../Pages/Auth/Signup";
import Users from "../../Admin/User/Users";
import Dashboard from "../../Admin/Dashboard/Dashboard"

const Home = lazy(() => import("../../Pages/Home/Home"));
const Cart = lazy(() => import("../../Pages/Cart/Cart"));
const ErrorPage = lazy(() => import("../../Pages/ErrorPage/ErrorPage"));
const SearchPage = lazy(() => import("../../Pages/SearchPage/SearchPage"));
const ProductList = lazy(() => import("../../Pages/ProductList/ProductList"));
const ProductDetail = lazy(() => import("../../Pages/ProductDetail/ProductDetail"));
const About = lazy(() => import("../../Pages/About/About"));
const WishList = lazy(() => import("../../Pages/WishList/WishList"));
const Profile = lazy(() => import('../../Pages/Profile/Profile'));


const AddProduct = lazy(() => import("../../Admin/Product/AddProduct"));
const AddBrand = lazy(() => import("../../Admin/Brand/AddBrand"));
const AddCategory = lazy(() => import("../../Admin/Category/AddCategory"));
const AddAbout = lazy(() => import("../../Admin/About/AddAbout"));
const AddHeaderSlider = lazy(() => import("../../Admin/HeaderSlider/AddHeaderSlider"));





export const Navigation = () => {

    return (
        <Routes>
           
            <Route>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="products/:categoryName" element={<ProductList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/:productName" element={<ProductDetail />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password/" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/page-not-found" element={<ErrorPage />} />
                <Route path="/account" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/add-brand" element={<AddBrand />} />
                <Route path="/admin/add-category" element={<AddCategory />} />
                <Route path="/admin/addAbout" element={<AddAbout />} />
                <Route path="/admin/addHomeSlider" element={<AddHeaderSlider />} />
            </Route>
        </Routes>

    )
}