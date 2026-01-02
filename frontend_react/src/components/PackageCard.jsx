import React from "react";
import { Grid, Box,Divider  } from "@mui/material";
import BulletPoint from "./BulletPoint";
import Btn from "./Btn";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import NavButton from "../components/button";
import CTAButton from "./CTAButton";
import { useNavigate } from "react-router-dom";
export default function PackageCard({ Bundle, svg }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isRTL = theme.direction === 'rtl';
  const navigate = useNavigate();
  const isBestSeller = Boolean(Bundle?.best_seller);
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
      <Grid item xs={11} md={2.9} sx={{ marginY: { xs: ".5rem" }, maxWidth: { xs: "400px", md: "100%" }, mx: { xs: "auto", md: "unset" } }}>
        {/* <Link to="/ContactUs"> */}
          <Grid
            container
            sx={{
              position: "relative",
              minHeight: "100%",
              textAlign: "center",
              padding: "1rem 1rem",
              boxShadow: isBestSeller
                ? "0px 16px 22px 6px rgba(33, 119, 255, 0.2)"
                : "0px 12px 16px 4px rgba(16, 24, 40, 0.08)",
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "end",
              fontWeight: "700",
              pl: isRTL ? 3 : 0,
              pr: isRTL ? 0 : 3,
              background: isBestSeller
                ? "linear-gradient(180deg, #E7F0FF 0%, #D8E7FF 40%, #CFE0FF 70%)"
                : "white",
              border: isBestSeller ? "2px solid #5B7BFF" : "2px solid #27307F",
              transition: "0.3s",
              "&:hover": {
                background: isBestSeller ? "linear-gradient(180deg, #E2ECFF 0%, #D3E2FF 40%, #C8DBFF 70%)" : "#fdfdfd",
                scale: "1.01",
              },
              "& > div:not(:last-child)": {
                marginBottom: "1rem",
              },
            }}
          >
            {isBestSeller && (
              <Box
                sx={{
                  position: "absolute",
                  top: -24,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #131F89 100%, #47C1CA 100%)",
                  
                  color: "#FFFFFF",
                  borderRadius: "999px",
                  zIndex: 10,
                  px: 2,
                  py: 2,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  fontFamily: "Cairo",
                  boxShadow: "0 8px 18px rgba(31, 122, 205, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,

                }}
              >
                
                <span sx={{color:"white",zIndex:11}} >★</span>
                <span >{isRTL ? "الأكثر شعبية" : "Most Popular"}</span>
              </Box>
              
            )}
            <CardInfo
              svg={svg}
              cardTitle={isRTL ? Bundle?.arabic_name : Bundle?.english_name}
            />
            <Divider sx={{ width: "90%", borderColor: "#000000", mb:3 ,fontWeight: "bold",borderBottomWidth: 2 }} />
            <Grid
              xs={11}
              sx={{
                minHeight: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignContent: "end",
                alignItems: "end",
                textAlign: "end",
                marginBottom:5,
                // marginRight:2,
                // marginLeft:4,
                "& > div:not(:last-child)": {
                  marginBottom: "0.5rem",
                },
              }}
            >
              <Box sx={{color:"#27307F", fontWeight: "bold", fontSize: "1.2rem"}}>{priceText}</Box>
              {offerText && <Box sx={{color:"#333333",fontSize:"1rem"}}>{offerText}</Box>}
              <Box sx={{ textAlign: "center", alignSelf: "center", mt: 1, mr :2 }}>
                <CTAButton
                  label={t('Book.btn')}
                  onClick={() => navigate('/ContactUs')}
                  // padding="0.75rem 3rem"
                />
              </Box>
              {/* <Box sx={{my:2, marginLeft:1}}>
                <NavButton className="p-3 mb-3">
                  {isRTL ? "احجز جلسة مجانية لعرض الباقة" : "Book a free session to view the package"}
                </NavButton>
              </Box> */}
              {Bundle?.advantages.map((advantage, index) => {
                // console.log("Rendering advantage:", advantage.arabic_advantage, advantage.english_advantage);
                return (
                  <BulletPoint 
                    key={index} 
                    title={advantage} 
                  />
                  
                );
              })}
              {/* <Box sx={{ flexGrow: 1 }} /> */}
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
        {/* </Link> */}
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
        // ml: 4,
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
