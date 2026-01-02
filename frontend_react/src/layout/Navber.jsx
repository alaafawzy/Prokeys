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

  // Add hover styles
  const navLinkStyle = {
    transition: 'color 0.3s ease'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = '#47C1CA';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = '';
  };

  return (
    <nav className="navbar navbar-expand-lg px-4" dir={theme.direction}>
      <style>{`
        @media (max-width: 991.98px) {
          .navbar-nav {
            align-items: center;
            text-align: center;
          }
          .navbar-nav .nav-item {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .navbar-nav .nav-link {
            padding: 0.75rem 1rem;
          }
        }
        .nav-link:hover {
          color: #47C1CA !important;
        }
      `}</style>
      <div className="container-fluid">
        {/* Logo - First on mobile, last on desktop */}
        <Link className="navbar-brand order-0 order-lg-3" to={"/"}>
          <img src={logo} alt="Logo" height="72" width="62" />
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler order-1 order-lg-2"
          type="button"
          aria-controls="main-nav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Reserve Button - Hidden on mobile, shown on desktop */}
        <div className="order-2 order-lg-0 d-none d-lg-block">
          <NavButton onClick={() => navigate('/ContactUs')}>
            {NavTitles.button}
          </NavButton>
        </div>

        {/* Collapse Menu */}
        <div
          className={`collapse navbar-collapse order-3 order-lg-1 ${open ? "show" : ""}`}
          id="main-nav"
        >
          <ul className="navbar-nav mx-auto gap-lg-4 fw-medium">
            <li className="nav-item">
              <Link className="nav-link" to={'/'} onClick={close}>{NavTitles.home}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/AboutUs'} onClick={close}>{NavTitles.who}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/Bundles'} onClick={close}>{NavTitles.bundles}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/Services'} onClick={close}>{NavTitles.services}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/Blogs'} onClick={close}>{NavTitles.blogs}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/ContactUs'} onClick={close}>{NavTitles.contact}</Link>
            </li>
            <li className="nav-item">
              <Switcher />
            </li>
            {/* Reserve Button - Shown only on mobile */}
            <li className="nav-item d-lg-none mt-3">
              <NavButton className="w-100" onClick={() => { navigate('/ContactUs'); close(); }}>
                {NavTitles.button}
              </NavButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
