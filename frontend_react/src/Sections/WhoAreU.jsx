import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import skills from "../assets/who we are/skills.png";
import financial from "../assets/who we are/financial.png";
import whyus from "../assets/who we are/whyus.png";
let icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
  >
    <rect x="4" y="4" width="48" height="48" rx="24" fill="#F4EBFF" />
    <rect
      x="4"
      y="4"
      width="48"
      height="48"
      rx="24"
      stroke="#F9F5FF"
      stroke-width="8"
    />
    <path
      d="M27 19H23.8C22.1198 19 21.2798 19 20.638 19.327C20.0735 19.6146 19.6146 20.0735 19.327 20.638C19 21.2798 19 22.1198 19 23.8V32.2C19 33.8802 19 34.7202 19.327 35.362C19.6146 35.9265 20.0735 36.3854 20.638 36.673C21.2798 37 22.1198 37 23.8 37H32.2C33.8802 37 34.7202 37 35.362 36.673C35.9265 36.3854 36.3854 35.9265 36.673 35.362C37 34.7202 37 33.8802 37 32.2V29M28 24H32V28M31.5 19.5V18M35.4393 20.5607L36.5 19.5M36.5103 24.5H38.0103M19 29.3471C19.6519 29.4478 20.3199 29.5 21 29.5C25.3864 29.5 29.2653 27.3276 31.6197 24"
      stroke="#131F89"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function WhoAreU() {
  const { t } = useTranslation();
  const who = t("who");
  const { serv1, serv2, serv3 } = t("OurServises");
  return (
    <>
      <Grid className="who-we-are">
        <Container >
          <Grid
            Container
            xs={11}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            <Box
              sx={{
                fontFamily: "Cairo",
                fontSize: "2rem",
                fontWeight: " 700",
                // lineHeight: " 24px",
                textAlign: "center",
                color: "#27307F",
                marginBottom: {
                  xs: "2rem",
                },
                marginTop:"3rem",
              }}
            >
              {who?.mainTitle}
            </Box>
            <Box
              sx={{
                fontFamily: "Cairo",
                fontSize: {
                  xs: "16px",
                  md: "24px",
                },
                fontWeight: " 500",
                lineHeight: " 30px",
                textAlign: "center",
                color: " #B8B8B8",
                width: {
                  xs: "100%",
                  md: "70%",
                },
                marginTop:"-20px"
              }}
            >
              {who?.mainDesc}
            </Box>
          </Grid>
          <Grid
            container
            sx={{
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
            <SectionDetails image={skills} title={serv3?.title} desc={serv3?.desc} second={false}/>
            <SectionDetails image={financial} title={serv2?.title} desc={serv2?.desc} second={true}/>
            <SectionDetails image={whyus} title={serv1?.title} desc={serv1?.desc} second={false}/>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}

export function SectionDetails({ image, title, desc,second }) {
  return (
    <Grid
      item
      md={3.8}
      xs={11}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: { xs: "2rem" },
      }}
    >
      <Box>
        <img
          src={image}
          alt={title}
          style={{  height: second?"170px":"150px", objectFit: "contain" }}
        />
      </Box>

      <Box
        sx={{
          fontFamily: "Cairo",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "30px",
          textAlign: "center",
          color: "#27307F",
          marginTop:"2rem"
        }}
      >
        {title}
      </Box>

      <Box
        sx={{
          fontFamily: "Cairo",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          textAlign: "center",
          color: "#333333",
          marginTop:"0.5rem",
        }}
      >
        {desc}
      </Box>
    </Grid>
  );
}
/* Section */

