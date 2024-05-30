import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoutes'

// import Login from '../screens/auth'
// import Dashboards from '../screens/dashboards'

// const Users = lazy(() => import('../screens/dashboards/users'));
// const AddUser = lazy(() => import('../screens/dashboards/users/addEdit'));
// const UserGroups = lazy(() => import('../screens/dashboards/user_groups'));
// const AddUsersGroup = lazy(() => import('../screens/dashboards/user_groups/addEdit'));
// const EmailTemplates = lazy(() => import('../screens/dashboards/email_templates'));
// const AddEmailTemplate = lazy(() => import('../screens/dashboards/email_templates/addEdit'));
// const SmtpServers = lazy(() => import('../screens/dashboards/smtp_servers'));
// const AddSmtpServers = lazy(() => import('../screens/dashboards/smtp_servers/addEdit'));
// const EditProfile = lazy(() => import('../screens/dashboards/settings/editProfile'));
// const GeneralSettings = lazy(() => import('../screens/dashboards/settings/generalSettings'));
// const DatabaseMaintenance = lazy(() => import('../screens/dashboards/settings/databaseMaintenance'));

// const Orders = lazy(() => import('../screens/oms_dashboard/orders'));
// const AddOrder = lazy(() => import('../screens/oms_dashboard/orders/addEdit'));
// const Customers = lazy(() => import('../screens/oms_dashboard/customers'));
// const AddCustomer = lazy(() => import('../screens/oms_dashboard/customers/addEdit'));
// const Suppliers = lazy(() => import('../screens/oms_dashboard/suppliers'));
// const AddSupplier = lazy(() => import('../screens/oms_dashboard/suppliers/addEdit'));
// const Orders_Waiting_For_Parts = lazy(() => import('../screens/oms_dashboard/orders_waiting_for_parts'));


// const Products = lazy(() => import('../screens/pplms_dashboard/products'));
// const AddProduct = lazy(() => import('../screens/pplms_dashboard/products/addEdit'));


import Home from "../../Pages/Home/Home";
import Cart from "../../Pages/Cart/Cart";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import ProductList from "../../Pages/ProductList/ProductList";
import ProductDetail from "../../Pages/ProductDetail/ProductDetail";
import About from "../../Pages/About/About";
import WishList from "../../Pages/WishList/WishList";
import Profile from '../../Pages/Profile/Profile'

import Login from "../../Pages/Auth/Login";
import ForgotPassword from "../../Pages/Auth/ForgotPassword"
import ResetPassword from "../../Pages/Auth/ResetPassword"
import Signup from "../../Pages/Auth/Signup";
import Users from "../../Admin/User/Users";
import AddProduct from "../../Admin/Product/AddProduct";
import AddBrand from "../../Admin/Brand/AddBrand";
import AddCategory from "../../Admin/Category/AddCategory";
import AddAbout from "../../Admin/About/AddAbout"
import AddHeaderSlider from "../../Admin/HeaderSlider/AddHeaderSlider"

import Dashboard from "../../Admin/Dashboard/Dashboard"



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