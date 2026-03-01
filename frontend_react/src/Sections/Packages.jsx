import React from "react";
import { Container } from "@mui/material";
import { Box, Grid } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import PackageCard from "../components/PackageCard";
import { icons } from "../Data/Samka";
import Btn from "../components/Btn";
import { Link } from "react-router-dom";
import { useLangPrefix } from "../hooks/useLangPrefix";
import { getPagePathsForLang } from "../config/pagePaths";

export default function Packages() {
  const { t, i18n } = useTranslation();
  const { Basic, Additional, Custom, Free, Tax, Common } = t("Packages");
  const bundles = [Custom, Additional, Basic];
  const prefix = useLangPrefix();
  const paths = getPagePathsForLang(i18n.language);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "end",
          textAlign: "end",
        fontFamily: "Tajawal",
        "& > div:not(:last-child)": {
          marginBottom: "1rem",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          "& > div:not(:last-child)": {
            marginBottom: "1rem",
          },
        }}
      >
        <Box sx={{ color: "rgba(19, 31, 137, 1)", fontWeight: "700" }}>
         
        </Box>
        <Box
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "rgba(79, 79, 79, 1)",
            padding: {},
          }}
        >
          {/* {mainDesc} */}
        </Box>
      </Box>
      <Grid
        container
        sx={{
          justifyContent: {xs:"center" ,md:"space-between"},
          alignItems: "stretch",
        }}
      >
        {bundles.map((bundle, index) => {
          return (
            <PackageCard svg={icons.extraPackage} Bundle={bundle} key={index} />
          );
        })}
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Link to={`${prefix}/${paths.bundles}`}>
          <Btn bg="rgba(19, 31, 137, 1)" FontColor="white" H="48px" W="272px">
            {Common?.showMore}
          </Btn>
        </Link>
      </Grid>
    </Container>
  );
}
