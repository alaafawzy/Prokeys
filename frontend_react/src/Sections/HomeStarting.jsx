import React, { useState, useEffect } from 'react';
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Box,Typography } from "@mui/material";
import landingnew from "../assets/landingnew.png";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import api from '../../Api';
import NavButton from "../components/button";
import { useNavigate } from "react-router-dom";
import CTAButton from '../components/CTAButton';
import { useLangPrefix } from "../hooks/useLangPrefix";
export default function HomeStarting() {
  const { t } = useTranslation();
  const Landing = t("Landing");
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const prefix = useLangPrefix();

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/homeStarting/'); // Adjust endpoint as needed
        // console.log(response.data[0]);
        
        if (response.data) {
          setData(response.data[0]);
        } else {
          // Set data to an empty array if the response is not an array
          setData([]);
        }
        // setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
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
                  backgroundPosition: "100%",
                  backgroundImage: `url(${data.image || landingnew})`,
                  backgroundSize: "contain",
                  backgroundRepeat:"no-repeat",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
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
                
              }}
            >
              
              <Box
                sx={{
                  fontFamily: "Cairo",
                  fontSize: { xs: "1.5rem", md: "42px" },
                  fontWeight: "700",
                  // lineHeight: { xs: "35px", md: "56px" },
                  letterSpacing: "-0.02em",
                  color:"#27307F",
                  marginBottom:"2rem"
                }}
              >
                <Trans
                  i18nKey={theme.direction=='rtl'?data.arabic_title:data.english_title}
                  // components={{ 1: <span id="LandingTitle" /> }}
                />
              </Box>
              <Typography
                component="h5"
                variant="h5"
                sx={{
                  fontFamily: "Cairo",
                  fontWeight:"bold",
                  // fontSize: { xs: "1.5rem", md: "3rem" },
                  // lineHeight: { xs: "35px", md: "72px" },
                  letterSpacing: "-0.02em",
                  color: "#4F4F4F",
                  marginBottom: "1rem",
                }}
              >
                <Trans
                  i18nKey={theme.direction=='rtl'?data.arabic_subtitle:data.english_subtitle}
                  components={{ 1: <span id="LandingTitle" /> }}
                />
              </Typography>
              <Box
                sx={{
                  fontFamily: "Cairo",
                  fontSize: "20px",
                  fontWeight: "400",
                  lineHeight: "30px",
                  letterSpacing: "-0.02em",
                  color: "#4F4F4F",
                  marginBottom: "2rem",
                }}
              >
                {theme.direction=='rtl'?data.arabic_description:data.english_description}
              </Box>
              {/* <Link to="/ContactUs">
                {/* <Btn bg={"#131F89"} FontColor={"white"} p={"1rem"} W={"151px"}>
                  {Landing.btn}
                </Btn> */}
                {/* <NavButton className=" d-lg-inline-block d-sm-none">
                  {Landing.btn}

                </NavButton>
              </Link>  */}
              {/* </Grid> */}
                        <Box sx={{ marginTop: "2rem" , textAlign: "center", marginBottom:"3rem" }}>
                      <CTAButton
                        label={t('Book.btn')}
                        onClick={() => navigate(`${prefix}/ContactUs`)}
                      />
                    </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
