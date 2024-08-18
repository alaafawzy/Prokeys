import React from "react";
import background from "../assets/loginBackground.jpeg";
import { Grid, Container, Box } from "@mui/material";

export default function LoginBackground({ children }) {
  return (
    <>
      <Grid
        sx={{
          boxSizing: "border-box",
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url(${background})`,
            backgroundSize: "cover",
            filter: "blur(13px)",
            zIndex: -1,
          },
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Grid>
    </>
  );
}
