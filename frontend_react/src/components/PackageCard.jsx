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
  const { t } = useTranslation();
  const isRTL = theme.direction === 'rtl';
  
  // Calculate discounted price if discount exists
  const originalPrice = Bundle?.price || 0;
  const discount = Bundle?.discount || 0;
  const hasDiscount = discount > 0;
  
  // Format price with translation
  const priceText = isRTL 
    ? `${originalPrice} ر.س شهرياً` 
    : `${originalPrice} SAR/month`;
  
  const offerText = hasDiscount 
    ? (isRTL 
        ? `خصم ${discount}% للاشتراك السنوي` 
        : `${discount}% off for annual subscription`)
    : null;
  
  return (
    <>
      <Grid item xs={11} md={2.9} sx={{ marginY: { xs: ".5rem" }, maxWidth: { xs: "400px", md: "100%" }, mx: "auto" }}>
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
              cardTitle={isRTL ? Bundle?.arabic_name : Bundle?.english_name}
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
              <Box sx={{color:"#27307F", fontWeight: "bold", fontSize: "1.2rem"}}>{priceText}</Box>
              {offerText && <Box sx={{color:"#333333",fontSize:"1rem"}}>{offerText}</Box>}
              <Box sx={{my:2, marginLeft:1}}>
                <NavButton className="p-3 mb-3">
                  {isRTL ? "احجز جلسة مجانية لعرض الباقة" : "Book a free session to view the package"}
                </NavButton>
              </Box>
              {Bundle?.advantages.map((advantage, index) => {
                // console.log("Rendering advantage:", advantage.arabic_advantage, advantage.english_advantage);
                return (
                  <BulletPoint 
                    key={index} 
                    title={advantage} 
                  />
                  
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

function CardInfo({ svg, cardTitle = "No Title" }) {
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';
  
  return (
    <Grid 
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        textAlign: "start",
        gap: "0.5rem",
        ml: 4
      }}
    >
      {/* <Grid item color="#333333">
        {isRTL ? (
          <>ريال <br/> فاتورة</>
        ) : (
          <>SAR <br/> Bill</>
        )}
      </Grid> */}

      <Grid item>
        <Box sx={{ paddingTop: "20px", fontSize: "20px", color: "#27307F", fontWeight: "bold" }}>
          {cardTitle}
        </Box>
      </Grid>
    </Grid>
  );
}
