import React from "react";
import Navber from "./Navber";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ToastContainer } from "react-toastify";

export default function Root() {
  const theme = useTheme();
  return (
    <>
      <Navber />
      <Grid
        sx={{
          minWidth: "100vw",
          minHeight: "100px",
          direction: `${theme.direction}`,
        }}
      >
        <Outlet />
      </Grid>
      <Footer />
    </>
  );
}
