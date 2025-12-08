import React, { useEffect, useState } from 'react';
import PackageCard from "../components/PackageCard";
import { Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { icons } from "../Data/Samka";
import CarouselComponent from "../components/Carousel";
import api from '../../Api';
export default function Bundles() {
  const { t } = useTranslation();
  const { Basic, Additional, Custom, Free, Tax, Common } = t("Packages");
  // const bundles = [Custom, Additional, Basic, Free, Tax];
  
  const [data, setData] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/carousel/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
      const fetchData = async () => {
        try {
          const response = await api.get('/bundles/'); // Adjust endpoint as needed
          if (Array.isArray(response.data)) {
            setBundles(response.data);
          } else {
            // Set data to an empty array if the response is not an array
            setBundles([]);
          }
          // setBundles(response.data);
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
    <Grid className="who-we-are pt-3">
    <Container
      sx={{
        marginY: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "end",
        textAlign: "end",
        fontFamily: "Cairo",
        fontSize: "1rem",
        color:"#47C1CA",
        "& > div:not(:last-child)": {
          marginBottom: "1rem",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Cairo",
          textAlign: "center",
          "& > div:not(:last-child)": {
            marginBottom: "1rem",
          },
        }}
      >
        {/* <Box sx={{ color: "rgba(19, 31, 137, 1)", fontWeight: "700" }}>
          <CarouselComponent items={data}></CarouselComponent>
        </Box> */}
        <Box  sx={{ fontFamily: "Cairo",
                    fontSize: "1rem",
                    color:"#47C1CA",fontWeight: "medium" }}>
          {Common.mainTitle}
        </Box>
        <Box
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#27307F",
            padding: {},
          }}
        >
          {Common.mainDesc}
        </Box>
      </Box>
      <Grid
        container
        sx={{
          margin: "1rem 0",
          justifyContent: {xs:"start",md:"end"},
          gap: "1rem",
        }}
      >
        {bundles.map((bundle, index) => {
          return (
            <PackageCard svg={icons.extraPackage} Bundle={bundle} key={index} />
          );
        })}
      </Grid>
    </Container>
    </Grid>
  );
}
