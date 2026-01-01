import React, { useState, useEffect } from "react";
import { Box, Grid, Hidden } from "@mui/material";
import { Container } from "@mui/material";
import InfiniteCarousel from "../components/NewCarousel";
import { useTranslation } from "react-i18next";
import api from "../../Api";

export default function OurSystems() {
  const { t } = useTranslation();
  const partners = t("Systems");
  const [systemPartners, setSystemPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemPartners = async () => {
      try {
        const response = await api.get('/system-partners/');
        setSystemPartners(response.data);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching system partners:", error);
        setLoading(false);
      }
    };

    fetchSystemPartners();
  }, []);
  
  // const loopItems = [...data, ...data,...data,...data,...data];
  // Extract logo URLs from the fetched data, prepending the base URL
  // const baseURL = api.defaults.baseURL.replace('/api', '') || 'http://localhost:8000';
  const data = systemPartners;
  const loopItems = [...data];

  return (
    <>
      <Grid
        container
        sx={{
          
          paddingTop: "2rem",
          marginBottom:"4rem",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            sx={{
              fontFamily: "Cairo",
              fontSize: "2.2rem",
              fontWeight: " 700",
              lineHeight: " 40px",
              textAlign: "center",
              color: "#27307F",
              justifyContent: "center",
              marginBottom:5,
            }}
          >
            {partners}
          </Grid>
          <Grid
            item
            md={12}
            xs={11}
            container
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              padding: "1rem 0",
              bgcolor: "rgba(71, 193, 202, 0.1)",
              borderRadius:25,
              overflow:"hidden",
              marginTop:5,
            }}
          >
            {loading ? (
              <Box sx={{ textAlign: 'center', width: '100%', py: 4 }}>Loading...</Box>
            ) : data.length > 0 ? (
              <InfiniteCarousel items={loopItems}></InfiniteCarousel>
            ) : (
              <Box sx={{ textAlign: 'center', width: '100%', py: 4 }}>No system partners available</Box>
            )}
          </Grid>
        </Container>
      </Grid>
    </>
  );
}

function SponserData({ img }) {
  return (
    <>
      <Grid
        item
        xs={6}
        md={2}
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          padding: "1rem",
          boxSizing: "border-box",
          minHeight: "100px",
        }}
      >
        {img}
      </Grid>
    </>
  );
}
