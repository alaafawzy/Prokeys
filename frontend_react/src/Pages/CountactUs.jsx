import React from "react";
import Connectwithus from "../Sections/Connectwithus";
import { Grid } from "@mui/material";
import Feedback from "../Sections/Feedback";

export default function CountactUs() {
  return (
    <Grid sx={{ margin: "2rem 0" }}>
      <Connectwithus />
      <Feedback/>
    </Grid>
  );
}
