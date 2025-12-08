import React from "react";
import { Grid, Box,Divider  } from "@mui/material";
import BulletPoint from "./BulletPoint";
import Btn from "./Btn";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import NavButton from "../components/button";
export default function PackageCard({ Bundle, svg }) {
  const theme = useTheme();
  const price="30000 ر.س شهرياً";
  const offer="خصم 20% للاشتراك السنوى";
  return (
    <>
      <Grid item xs={11} md={2.9} sx={{ marginY: { xs: ".5rem" } }}>
        <Link to="/ContactUs">
          <Grid
            container
            sx={{
              minHeight: "100%",
              textAlign: "center",
              padding: "1rem 0",
              boxShadow: "0px 12px 16px 4px rgba(16, 24, 40, 0.08)",
              borderRadius: "0.5rem",
              justifyContent: "center",
              alignItems: "space-between",
              fontWeight: "700",
              background: "white",
              border: "2px solid #27307F",
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
            <Divider sx={{ width: "80%", borderColor: "#000000", mb:3 ,fontWeight: "bold",borderBottomWidth: 2 }} />
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
                marginBottom:5,
                "& > div:not(:last-child)": {
                  marginBottom: "0.5rem",
                },
              }}
            >
              <Box sx={{color:"#27307F"}}>{price}</Box>
              <Box sx={{color:"#333333",fontSize:"1rem"}}>{offer}</Box>
              <Box sx={{my:2, marginLeft:1}}>
              <NavButton className="p-3 mb-3" >احجز جلسة مجانية لعرض الباقة</NavButton>
              </Box>
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

            {/* <Grid xs={12}>
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
            </Grid> */}
          </Grid>
        </Link>
      </Grid>
    </>
  );
}

function CardInfo({ svg, cardSale = "", cardPrice = "N/A", cardTitle = "No Title" }) {
  return (
    <Grid 
  container
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",   // start horizontally
    textAlign: "start",         // start text alignment
    gap: "0.5rem",
    ml:4
  }}
>
  <Grid item color="#333333">
    ريال <br/> فاتورة 
  </Grid>

  <Grid item>
    <Box sx={{ fontSize: "20px", color: "#27307F" }}>
      {cardTitle}
    </Box>
  </Grid>
</Grid>

  );
}
