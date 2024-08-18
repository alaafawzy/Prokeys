import React from "react";
import { Grid } from "@mui/material";
import KnowMore from "../Sections/KnowMore";
import Packages from "../Sections/Packages";
import Feedback from "../Sections/Feedback";
import FAQ from "../Sections/FAQ";
import OurClient from "../Sections/OurClient";
import WhoAreU from "../Sections/WhoAreU";
import HomeStarting from "../Sections/HomeStarting";
import BookYourSession from "../Sections/BookYourSession";
import Connectwithus from "../Sections/Connectwithus";
import HowWeWork from "../Sections/HowWeWork";
import OurSystems from "../Sections/OurSystems";

export default function Home() {
  return (
    <Grid
      sx={{
        "& > div": {
          marginBottom: "5rem",
        },
      }}
    >
      <HomeStarting />
      {/* <OurClient /> */}
      <WhoAreU />
      <OurSystems />
      <HowWeWork />
      <BookYourSession />
      {/* <Packages numOfBundles={3} /> */}
      <Feedback />
      <FAQ />
      {/* <Connectwithus /> */}
    </Grid>
  );
}
