import React from "react";
import logo from "../assets/logo4.png";
import { Container, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InputError from "./InputError";

export default function FormFrame({ children, subtitle, title }) {
  const { t } = useTranslation();
  const formFrame = t("FormFrame");
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        md={5}
        sx={{
          background: "white",
          flexDirection: "column",
          padding: "1rem 2rem",
          boxSizing: "border-box",
          borderRadius: "16px",
          "& > div:not(:last-child)": {
            marginBottom: ".5rem",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={logo}></img>
        </Grid>
        <Grid>
          <Box
            sx={{
              fontFamily: "Tajawal",
              fontSize: "24px",
              fontWeight: " 700",
              lineHeight: " 32px",
              textAlign: "center",
            }}
          >
            {title}
          </Box>
          <Box
            sx={{
              fontFamily: "Tajawal",
              fontSize: "16px",
              fontWeight: " 400",
              lineHeight: " 24px",
              textAlign: "center",
              color: "#4F4F4F",
            }}
          >
            {subtitle}
          </Box>
        </Grid>
        {children}
        <Link to="/">
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Tajawal",
              fontSize: "14px",
              fontWeight: " 400",
              lineHeight: " 20px",
              textAlign: "left",
              color: "#4F4F4F",
              cursor: "pointer",
            }}
          >
            {formFrame.mainPage}
          </Grid>
        </Link>
      </Grid>
    </Container>
  );
}
