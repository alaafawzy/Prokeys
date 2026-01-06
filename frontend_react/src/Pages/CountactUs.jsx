import React from "react";
import { usePageMetadata } from "../hooks/useMetadata";
import Connectwithus from "../Sections/Connectwithus";
import { Grid } from "@mui/material";
import Feedback from "../Sections/Feedback";

export default function CountactUs() {
  // Load metadata for contact page
  usePageMetadata('contactus');

  return (
    <Grid sx={{ margin: "2rem 0" }}>
      <Connectwithus />
      <Feedback/>
    </Grid>
  );
}
