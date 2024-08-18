import React from "react";
import { Grid, Box } from "@mui/material";
import BulletPoint from "./BulletPoint";
import Btn from "./Btn";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function PackageCard({ Bundle, svg }) {
  const theme = useTheme();
  return (
    <>
      <Grid item xs={11} md={3.8} sx={{ marginY: { xs: ".5rem" } }}>
        <Link to="/ContactUs">
          <Grid
            container
            sx={{
              minHeight: "100%",
              textAlign: "center",
              padding: "1rem 0",
              boxShadow: "0px 12px 16px 4px rgba(16, 24, 40, 0.08)",
              borderRadius: "1rem",
              justifyContent: "center",
              alignItems: "space-between",
              fontWeight: "700",
              background: "white",
              transition: "0.3s",
              "&:hover": {
                background: "#fdfdfd",
                cursor: "pointer",
                scale: "1.01",
              },
              "& > div:not(:last-child)": {
                marginBottom: "1rem",
              },
              "& > div:last-child": {
                alignSelf: "end",
              },
            }}
          >
            <CardInfo
              svg={svg}
              // cardPrice={Bundle?.cardPrice}
              // cardSale={Bundle?.cardSale}
              cardTitle={theme.direction=='rtl'?Bundle?.arabic_name:Bundle?.english_name}
            />
            <Grid
              xs={11}
              sx={{
                minHeight: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignContent: "end",
                alignItems: "end",
                textAlign: "end",
                "& > div:not(:last-child)": {
                  marginBottom: "0.5rem",
                },
              }}
            >
              {Bundle?.advantages.map((bullet, index) => {
                return (
                  <BulletPoint title={bullet} />
                );
              })}
              {/* {Bundle?.bullet1 && <BulletPoint title={Bundle.bullet1} />}
              {Bundle?.bullet2 && <BulletPoint title={Bundle.bullet2} />}
              {Bundle?.bullet3 && <BulletPoint title={Bundle.bullet3} />}
              {Bundle?.bullet4 && <BulletPoint title={Bundle.bullet4} />}
              {Bundle?.bullet5 && <BulletPoint title={Bundle.bullet5} />} */}
            </Grid>

            <Grid xs={12}>
              <Link to="/ContactUs">
                <Btn
                  bg="rgba(19, 31, 137, 1)"
                  FontColor="white"
                  H="48px"
                  m="0 1rem"
                >
                  {theme.direction=='rtl'?"تواصل معنا":"Get Started"}
                </Btn>
              </Link>
            </Grid>
          </Grid>
        </Link>
      </Grid>
    </>
  );
}

function CardInfo({ svg, cardSale = "", cardPrice = "N/A", cardTitle = "No Title" }) {
  return (
    <Grid>
      <Grid item xs={12}>
        {svg}
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ fontSize: "20px", color: "rgba(19, 31, 137, 1)" }}>
          {cardTitle}
        </Box>
      </Grid>
      {/* <Grid item xs={12}>
        <Box
          sx={{
            fontSize: "32px",
            color: "rgba(26, 26, 26, 1)",
            "&::first-letter": { color: "transparent", display: "none" },
          }}
        >
          {cardPrice}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ color: "rgba(234, 138, 78, 1)" }}>{cardSale}</Box>
      </Grid> */}
    </Grid>
  );
}
