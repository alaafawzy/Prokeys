import React, { useEffect } from "react";
import Navber from "./Navber";
import Footer from "./Footer";
import { Outlet, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Root() {
  const theme = useTheme();
  const { lang } = useParams();
  const { i18n } = useTranslation();

  // Keep i18n language in sync with the URL prefix (/en or /ar)
  useEffect(() => {
    if (lang === "en" || lang === "ar") {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang, i18n]);
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
