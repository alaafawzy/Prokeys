import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePageMetadata } from "../hooks/useMetadata";
import KnowMore from "../Sections/KnowMore";
import { SectionDetails } from "../Sections/WhoAreU";
import Btn from "../components/Btn";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import DescriptionSection from "../Sections/ServicesDescriptionSection";
import Feedback from "../Sections/Feedback";
import ServicesSection from "./ServiceSection";

// Load metadata for services page
export default function OurServices() {
  usePageMetadata('services');

  const theme = useTheme();
  const { t } = useTranslation();
  const { title1, desc1, title2, desc2, join, btn, serv1, serv2, serv3 } =
    t("OurServises");
  const who = t("who");
  return (
    <>
    <DescriptionSection/>
    <ServicesSection/>
    <Feedback/>
    </>
  );
}
