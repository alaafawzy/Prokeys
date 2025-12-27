import React, { useContext } from "react";
import { createBrowserRouter } from "react-router-dom";
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

export default function Routers() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "/AboutUs", element: <AboutUs /> },
        // { path:"/FreeProducts", element: <FreeProducts /> },
        { path: "/FQA", element: <FQA /> },
        { path: "/Bundles", element: <BundlesPage /> },
        { path: "/OurServises", element: <OurServises /> },
        { path: "/ContactUs", element: <CountactUs /> },
        { path: "/Blogs", element: <Blogs /> },
        { path: "/blog/:id", element: <BlogDetails /> },
        // { path:"/StepperMobile", element: <StepperMobile />  },
        // { path: "/login",element: <Login /> },
        // { path: "/logout",element: <Logout /> },
        // { path: "/register",element: <Register /> },
        // { path: "/forgetPassword",element: <ForgetPassword /> },
        // { path: "/reset-password/:uid/:token/",element: <Reset /> },
        // { path: "/ChangePassword",element: <ChangePassword /> },
      ],
    },
    
  ]);

  return routers;
}
