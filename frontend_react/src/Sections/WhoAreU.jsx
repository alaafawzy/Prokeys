import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import skills from "../assets/who we are/skills.png";
import financial from "../assets/who we are/financial.png";
import whyus from "../assets/who we are/whyus.png";
import { Link } from "react-router-dom";
import { useLangPrefix } from "../hooks/useLangPrefix";

export default function WhoAreU() {
  const { t } = useTranslation();
  const who = t("who");
  const { serv1, serv2, serv3 } = t("OurServises");
  const navigate = useNavigate();
  const prefix = useLangPrefix();
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
          <Box sx={{ marginTop: "2rem" , textAlign: "center", marginBottom:"3rem" }}>
            <CTAButton
              label={t('Book.btn')}
              onClick={() => navigate(`${prefix}/ContactUs`)}
            />
          </Box>
        </Container>
      </Grid>
    </>
  );
}

export function SectionDetails({ image, title, desc,second }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
    const prefix = useLangPrefix();
  
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
        {/* <Link to={`${prefix}/ContactUs`}> */}
        <img
          src={image}
          alt={title}
          style={{  height: second?"170px":"150px", objectFit: "contain" }}
        />
        {/* </Link> */}
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

