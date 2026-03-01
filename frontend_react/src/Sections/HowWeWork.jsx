import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Session from "../components/Session";
import { Typography, Button } from "@mui/material";
import reserve from "../assets/how we work/reserve.png";
import choice2 from "../assets/how we work/choice2.png";
import upload from "../assets/how we work/upload.png";
import leftArrow from "../assets/how we work/leftArrow.png";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import { useLangPrefix } from "../hooks/useLangPrefix";
import { getPagePathsForLang } from "../config/pagePaths";
export default function HowWeWork() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isEnglish = theme.dir === "ltr";
  const HowWeWork = t("HowWeWork");
  const navigate = useNavigate();
  const prefix = useLangPrefix();
  const paths = getPagePathsForLang(i18n.language);
  
  const arrowStyle = isEnglish ? { transform: "scaleX(-1)" } : {};
  
  
  return (
    <Box sx={{ py: 10, backgroundColor: "#fff" }}>
      <Container maxWidth="lg" 
                >
        
        {/* top title */}
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#47C1CA", mb: 1, fontSize: 18, }}
          fontFamily="Cairo"
          
        >
          {HowWeWork.howTitle}
        </Typography>

        <Typography
          variant="h4"
          align="center"
          
          sx={{
            fontWeight: 700,
            color: "#27307F",
            mb: 15,
            fontFamily: "Cairo",
            fontSize:"2.2rem"
          }}
          
        >
          {HowWeWork.howDesc}
        </Typography>

        {/* Steps */}
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start" >
          
            <Grid item xs={12} sm={6} md={3} sx={{ order: { xs: 3, md: 0 } ,direction: theme.direction==='rtl'?'ltr':'rtl'}}>
              <Box sx={{ textAlign: "center" }}>

                {/* Icon circle */}
                <Box
                  sx={{
                    width: 16,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0px 12px 40px rgba(0,0,0,0.08)",
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    
                  }}
                >
                  <img src={upload} alt={HowWeWork.sesstionTitle3} width="250" />
                </Box>

                {/* Number */}
                <Typography
                  sx={{
                    fontSize: 48,
                    fontWeight: "bold",
                    color: "#235789",
                    mb: 1,
                    fontFamily: "Cairo",
                  }}
                >
                  {3}
                </Typography>

                {/* Title */}
                <Typography
                  sx={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#27307F",
                    mb: 1,
                    fontFamily: "Cairo",
                  }}
                >
                  {HowWeWork.sesstionTitle3}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight:"medium",
                    color: "#27307F",
                    lineHeight: "26px",
                    fontFamily: "Cairo",
                  }}
                >
                  {HowWeWork.sesstionDesc3}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                  sx={{
                    width: 16,
                    height: 80,
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt:20,
                    
                  }}
                >
                  <img src={leftArrow} alt="left arrow" width="120" style={arrowStyle} />
                
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ order: { xs: 2, md: 0 } ,direction: theme.direction==='rtl'?'ltr':'rtl'}}>
              <Box sx={{ textAlign: "center" }}>

                {/* Icon circle */}
                <Box
                  sx={{
                    width: 16,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0px 12px 40px rgba(0,0,0,0.08)",
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={choice2} alt={HowWeWork.sesstionTitle2} width="250" />
                </Box>

                {/* Number */}
                <Typography
                  sx={{
                    fontSize: 48,
                    fontWeight: "bold",
                    color: "#235789",
                    mb: 1,
                    fontFamily: "Cairo",
                  }}
                >
                  {2}
                </Typography>

                {/* Title */}
                <Typography
                  sx={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#27307F",
                    mb: 1,
                    fontFamily: "Cairo",
                  }}
                >
                  {HowWeWork.sesstionTitle2}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight:"medium",
                    color: "#27307F",
                    lineHeight: "26px",
                    fontFamily: "Cairo",
                  }}
                >
                  {HowWeWork.sesstionDesc2}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                  sx={{
                    width: 15,
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt:22,
                    
                  }}
                >
                  <img src={leftArrow} alt="left arrow" width="120" style={arrowStyle}/>
                </Box>
                
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ order: { xs: 1, md: 0 }, direction: theme.direction==='rtl'?'ltr':'rtl' }}>
              <Box sx={{ textAlign: "center" }}>

                {/* Icon circle */}
                <Box
                  sx={{
                    width: 16,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0px 12px 40px rgba(0,0,0,0.08)",
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={reserve} alt={HowWeWork.sesstionTitle1} width="250" />
                </Box>

                {/* Number */}
                <Typography
                  sx={{
                    fontSize: 48,
                    fontWeight: "bold",
                    color: "#235789",
                    mb: 1,
                    fontFamily: "Cairo",
                  }}
                >
                  {1}
                </Typography>

                {/* Title */}
                <Typography
                  sx={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#27307F",
                    mb: 1,
                    fontFamily: "Cairo",
                  }}
                >
                  {HowWeWork.sesstionTitle1}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight:"medium",
                    color: "#27307F",
                    lineHeight: "26px",
                    fontFamily: "Cairo",
                  }}
                >
                  {HowWeWork.sesstionDesc1}
                </Typography>
              </Box>
            </Grid>
          
        </Grid>

        
              <Box sx={{ marginTop: "2rem" , textAlign: "center", marginBottom:"3rem" }}>
                <CTAButton
                  label={t('Book.btn')}
                  onClick={() => navigate(`${prefix}/${paths.contact}`)}
                />
              </Box>
      </Container>
    </Box>
  );
}
