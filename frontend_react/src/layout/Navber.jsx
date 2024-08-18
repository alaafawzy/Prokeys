import { Box, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Btn from "../components/Btn";
import { useTheme } from "@emotion/react";
import logo from "../assets/newLogo.svg";
import oldlogo from "../assets/oldLogo.svg";
import Switcher from "../components/Switcher";
import { useTranslation } from "react-i18next";
import { UserContext } from '../context/UserContext';
export default function Navber() {
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();
  const NavTitles = t("Navbar");
  const [currentPage, setcurrentPage] = useState(
    location.pathname.split("/")[1]
  );
  const [openMobileNav, setopenMobileNav] = useState(false);
  const { user, loading } = useContext(UserContext);
  const currentUser = user;

  const handleNavToggle = (val) => {
    setopenMobileNav((prev) => {
      return val || !prev;
    });
  };

  useEffect(() => {
    return () => {
      handleNavToggle(false);
    };
  }, []);
  useEffect(() => {
    setcurrentPage(location.pathname.split("/")[1]);
  }, [location.pathname]);
  return (
    <Container
      sx={{ padding: { xs: "0 !important", direction: `${theme.direction}` } }}
    >
      {/* for PC purpose */}
      <Grid
        container
        sx={{
          display: { xs: "none", md: "flex" },
          width: "100%",
          padding: "1rem 0",
          boxSizing: "border-box",
          background: "white",
          justifyContent: "space-between",
        }}
        disableGutters={true}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Switcher />
          {currentUser ? (
            <>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  "&:hover": {
                    "& > div:last-child": {
                      animation: "mymove2 ",
                      animationDuration: "1s",
                      animationFillMode: "both",
                    },
                  },
                }}
              >
                <Grid sx={{ marginLeft: "1rem" }}></Grid>
                <Grid
                  sx={{
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      color: "#005288",
                      fontSize: "15px",
                      fontWeight: "400",
                      lineHeight: "20.25px",
                    }}
                  >
                     {theme.direction === 'rtl' ? (
        <>
          <strong>{currentUser.first_name}</strong> مرحبا
        </>
      ) : (
        <>
          welcome <strong>{currentUser.first_name}</strong>
        </>
      )}
                  </Box>
                  
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Link to={"/register"}>
                <Btn bg={"white"} FontColor={"#131F89"} m={"0 .5rem"}>
                  {NavTitles.new}
                </Btn>
              </Link>
              <Link to={"/login"}>
                <Btn bg={"#131F89"} FontColor={"white"} m={"0 .5rem"}>
                  {NavTitles.login}
                </Btn>
              </Link>
            </>
          )}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <NavTitle to={"/FQA"} active={currentPage == "FQA"}>
            {NavTitles.FQA}
          </NavTitle>
          {/* <NavTitle to={"/FreeProducts"} active={currentPage == "FreeProducts"}>
            {NavTitles.free}
          </NavTitle> */}
          <NavTitle to={"/OurServises"} active={currentPage == "OurServises"}>
            {NavTitles.services}
          </NavTitle>
          <NavTitle to={"/ContactUs"} active={currentPage == "ContactUs"}>
            {NavTitles.contact}
          </NavTitle>
          <NavTitle to={"/Bundles"} active={currentPage == "Bundles"}>
            {NavTitles.bundles}
          </NavTitle>
          <NavTitle to={"/AboutUs"} active={currentPage == "AboutUs"}>
            {NavTitles.who}
          </NavTitle>
          <NavTitle to={"/"} active={currentPage == ""}>
            {NavTitles.home}
          </NavTitle>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <img src={logo} width={"100%"} height={"120px"}/>
            </Box>
          </Link>
        </Grid>
      </Grid>

      {/* for mob  purpose */}
      <Grid
        container
        sx={{
          display: { xs: "flex", md: "none" },
          position: "relative",
          height: "120px",
        }}
      >
        <Grid
          item
          xs={12}
          container
          sx={{
            display: { xs: "flex", md: "none" },
            padding: "1.4rem .8rem",
            boxSizing: "border-box",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            zIndex: "55555",
            background: "white",
            borderBottom: "1px solid black",
            direction: "rtl",
          }}
        >
          <Grid item xs={6}>
            <Link to={"/"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Box
                  sx={{ width: "80px", height: "70px", paddingRight: "1rem" }}
                >
                  <img src={logo} width={"100%"} />
                </Box>
              </Box>
            </Link>
          </Grid>
          <Grid
            item
            container
            xs={3}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Switcher xs={6} />
            <Grid
              item
              xs={6}
              onClick={() => {
                handleNavToggle();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                width="100%"
                height="100%"
              >
                <path
                  fill="black"
                  fill-rule="evenodd"
                  d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
                />
              </svg>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: { xs: openMobileNav ? "flex" : "none", md: "none" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "fixed",
            top: "110px",
            minHeight: "calc( 100vh - 110px)",
            zIndex: "5555",
            background: "white",
          }}
        >
          <MobileNav
            handleNavToggle={handleNavToggle}
            currentPage={currentPage}
            NavTitles={NavTitles}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
function NavTitle({ children, active, to, handleNavToggle }) {
  return (
    <Grid
      item
      sx={{
        padding: "1rem .5rem",
      }}
      onClick={() => {
        if(handleNavToggle)
         return handleNavToggle();
      }}
    >
      <Link to={to}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Tajawal",
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: "19.2px",
            letterSpacing: "0em",
            padding: "5px 0",
            cursor: "pointer",
            color: active ? "#1a1a1a" : "#828282",
          }}
        >
          {children}
        </Box>
      </Link>
    </Grid>
  );
}
function MobileNav({ handleNavToggle, currentPage, NavTitles }) {
  return (
    <Grid
      container
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        lineHeight: "22px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "400",
        zIndex: "1000",
        background: "white",
        "& > div": {
          display: "flex",
          fontSize: "1rem",
          fontWeight: "700",
          padding: "1rem 0",
          "&:hover": {
            background: "white",
            "& > a": {
              color: "black",
            },
          },
        },
      }}
    >
      <NavTitle
        to={"/FQA"}
        active={currentPage == "FQA"}
        handleNavToggle={handleNavToggle}
      >
        {NavTitles.FQA}
      </NavTitle>
      <NavTitle
        to={"/OurServises"}
        active={currentPage == "OurServises"}
        handleNavToggle={handleNavToggle}
      >
        {NavTitles.services}
      </NavTitle>
      <NavTitle
        to={"/Bundles"}
        active={currentPage == "Bundles"}
        handleNavToggle={handleNavToggle}
      >
        {NavTitles.bundles}
      </NavTitle>
      <NavTitle
        to={"/ContactUs"}
        active={currentPage == "ContactUs"}
        handleNavToggle={handleNavToggle}
      >
        {NavTitles.contact}
      </NavTitle>
      <NavTitle
        to={"/AboutUs"}
        active={currentPage == "AboutUs"}
        handleNavToggle={handleNavToggle}
      >
        {NavTitles.who}
      </NavTitle>
      <NavTitle
        to={"/"}
        active={currentPage == ""}
        handleNavToggle={handleNavToggle}
      >
        {NavTitles.home}
      </NavTitle>
    </Grid>
  );
}
