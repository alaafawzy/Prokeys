import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/newLogo.svg";
 import NavButton from "../components/button";
import Switcher from "../components/Switcher";
const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();
  const NavTitles = t("Navbar");
  // const Navbar2 = t("Navbar");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(prev => !prev);
  const close = () => setOpen(false);
  return (
    <nav className="navbar navbar-expand-lg  px-4  "dir={theme.direction}>
      <div className="container-fluid">
        {/* Left: Reserve Button */}
        <NavButton className=" d-lg-inline-block d-sm-none">
          {NavTitles.button}

        </NavButton>

        {/* Toggler (controlled by React) */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="main-nav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse controlled by state */}
        <div
          className={`collapse navbar-collapse justify-content-center ${open ? "show" : ""}`}
          id="main-nav"
        >
          <ul className="navbar-nav gap-4 fw-medium">
            <li className="nav-item">
              {/* <a className="nav-link" href="/" onClick={close}>{NavTitles.home}</a> */}
              <Link className="nav-link" to={'/'}>{NavTitles.home}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/AboutUs'}>{NavTitles.who}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/Bundles'}>{NavTitles.bundles}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/Services'}>{NavTitles.services}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/Blogs'}>{NavTitles.blogs}</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={'/ContactUs'}>{NavTitles.contact}</Link>
            </li>
            <li className="nav-item">
              <Switcher />
            </li>
            <li className="nav-item d-lg-none">
              <NavButton className=" ">
                {NavTitles.button}
              </NavButton>
            </li>
            
          </ul>
        </div>

        {/* Right: Logo */}
        <Link className="navbar-brand ms-auto" to={"/"}>
        {/* <a  href="#"> */}
          
          <img src={logo} alt="Logo" height="72" width="62" />
          
        {/* </a> */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
