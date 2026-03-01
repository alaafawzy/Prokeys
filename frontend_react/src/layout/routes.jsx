import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import i18n from "i18next";
import "../utils/i18n"; // ensure i18n is initialized
import { getPagePathsForLang } from "../config/pagePaths";
import Root from "./Root";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Register from "../Pages/Register";
import FreeProducts from "../Pages/FreeProducts";
import FQA from "../Pages/FQA";
import OurServises from "../Pages/OurServises";
import Bundles from "../Pages/Bundles";
import CountactUs from "../Pages/CountactUs";
// import Layout from "../Pages/Profile/Layout";
// import Profile from "../Pages/Profile/Profile";
// import Services from "../Pages/Profile/Services";
// import Files from "../Pages/Profile/Files";
import StepperComp from "../components/Stepper";
import StepperMobile from "../components/StepperMobile";
import ForgetPassword from "../Pages/ForgetPassword";
import ConfirmPassword from "../Pages/ConfirmPass";
import Reset from "../Pages/Reset";
import ChangePassword from "../Pages/ChangePassword";
import BundlesPage from "../Pages/BundlesPage";

import Blogs from "../Pages/Blogs";
import BlogDetails from "../Pages/BlogDetails";
import ServiceDetails from "../Pages/ServiceDetails";

export default function Routers() {
  const currentLang = i18n.language === "en" ? "en" : "ar";
  const paths = getPagePathsForLang(currentLang);

  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/ar" replace />,
    },
    {
      path: "/:lang",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: paths.about, element: <AboutUs /> },
        // { path:"FreeProducts", element: <FreeProducts /> },
        { path: paths.faq, element: <FQA /> },
        { path: paths.bundles, element: <BundlesPage /> },
        { path: paths.services, element: <OurServises /> },
        { path: paths.serviceDetails, element: <ServiceDetails /> },
        { path: paths.contact, element: <CountactUs /> },
        { path: paths.blogs, element: <Blogs /> },
        { path: paths.blogDetails, element: <BlogDetails /> },
        // { path:"StepperMobile", element: <StepperMobile />  },
        // { path: "login",element: <Login /> },
        // { path: "logout",element: <Logout /> },
        // { path: "register",element: <Register /> },
        // { path: "forgetPassword",element: <ForgetPassword /> },
        // { path: "reset-password/:uid/:token/",element: <Reset /> },
        // { path: "ChangePassword",element: <ChangePassword /> },
      ],
    },
    
  ]);

  return routers;
}
