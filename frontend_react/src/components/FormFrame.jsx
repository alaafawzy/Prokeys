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
        width: "100%", // Adjust container width
        maxWidth: "1000px", // Set a max width
        padding: "2rem", // Optional: Add some padding around the container
      }}
    >
      <Grid
        container
        md={8} // Increase the width of the grid
        sx={{
          background: "white",
          flexDirection: "column",
          padding: "2rem 3rem", // Adjust padding for more space inside
          boxSizing: "border-box",
          borderRadius: "16px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for better visual
          "& > div:not(:last-child)": {
            marginBottom: ".5rem",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem", // Add margin for spacing
          }}
        >
          <img src={logo} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
        </Grid>
        <Grid>
          <Box
            sx={{
              fontFamily: "Tajawal",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              textAlign: "center",
              marginBottom: "0.5rem", // Add margin for spacing
            }}
          >
            {title}
          </Box>
          <Box
            sx={{
              fontFamily: "Tajawal",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
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
              fontWeight: "400",
              lineHeight: "20px",
              textAlign: "left",
              color: "#4F4F4F",
              cursor: "pointer",
              marginTop: "1rem", // Add margin for spacing
            }}
          >
            {formFrame.mainPage}
          </Grid>
        </Link>
      </Grid>
    </Container>
  );
}
