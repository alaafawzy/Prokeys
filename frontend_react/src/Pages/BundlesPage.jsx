import React, { useState, useEffect } from 'react';
import { Grid, Box } from "@mui/material";
import { Container } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { usePageMetadata } from "../hooks/useMetadata";
import { Question_array } from "../components/Question_array";
import api from '../../Api';
import Feedback from '../Sections/Feedback';
import OurSystems from '../Sections/OurSystems';
import AboutWithRightPic from '../Sections/AboutRightpic';
import Bundles from './Bundles';
import DescriptionSection from '../Sections/BundlesDescriptionSection';
// import { Question } from "../Sections/FAQ";

export default function BundlesPage() {
  // Load metadata for bundles page
  usePageMetadata('bundle');

  const theme = useTheme();
  const { t } = useTranslation();
  const Who = t("AboutUs");
  
  return (
    <Grid>
      <Container
        sx={{
          width: "100%",
          justifyContent: "center",
          "& > div:not(:last-child)": {
            marginBottom: "4rem",
          },
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center",
            textAlign: "end",
            marginBottom: "3rem",
          }}
        >
            
          <DescriptionSection />
          <Bundles/>
          {/* <AboutWithRightPic  imageOnRight={true}/>
          <AboutWithRightPic /> */}
          <OurSystems />
          <Feedback/>
        </Grid>
        
      </Container>
    </Grid>
  );
}
