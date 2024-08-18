import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import LandingImage from "../assets/LandingBackground.jpeg";
import linesImg from "../assets/linesBackground.png";
import Btn from "../components/Btn";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

export default function HomeStarting() {
  const { t } = useTranslation();
  const Landing = t("Landing");
  const theme = useTheme();
  return (
    <>
      <Grid>
        <Container>
          <Grid
            container
            sx={{
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
            <Grid item md={5} xs={11}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundPosition: "75% 25%",
                  backgroundImage: `url(${LandingImage})`,
                  backgroundSize: "cover",
                  borderRadius:
                    theme.direction == "rtl"
                      ? "160px 0px 0px 0px"
                      : "0px 160px 0px 0px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundPosition: "75% 25%",
                    backgroundImage: `url(${linesImg})`,
                    backgroundSize: "cover",
                    position: "absolute",
                  }}
                ></Box>
              </Box>
            </Grid>

            <Grid
              item
              md={6.5}
              xs={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                textAlign: "end",

                "& > div:not(:last-child)": {
                  marginBottom: "3rem",
                },
              }}
            >
              <Box
                sx={{
                  fontFamily: "Tajawal",
                  fontSize: { xs: "1.5rem", md: "3rem" },
                  fontWeight: "700",
                  lineHeight: { xs: "35px", md: "72px" },
                  letterSpacing: "-0.02em",
                }}
              >
                <Trans
                  i18nKey={Landing.title}
                  components={{ 1: <span id="LandingTitle" /> }}
                />
              </Box>

              <Box
                sx={{
                  fontFamily: "Tajawal",
                  fontSize: "20px",
                  fontWeight: "400",
                  lineHeight: "30px",
                  letterSpacing: "-0.02em",
                  color: "#4F4F4F",
                }}
              >
                {Landing.info}
              </Box>
              <Link to="/ContactUs">
                <Btn bg={"#131F89"} FontColor={"white"} p={"1rem"} W={"151px"}>
                  {Landing.btn}
                </Btn>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
