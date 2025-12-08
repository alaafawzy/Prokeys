import React from "react";
import { Box, Grid, Hidden } from "@mui/material";
import { Container } from "@mui/material";
import InfiniteCarousel from "../components/NewCarousel";
import { useTranslation } from "react-i18next";

import { wafaq, zoho, xero, qyood, odoo, oracle } from "../assets/Systems";

const data = [wafaq, zoho, xero, odoo, qyood, oracle];

export default function OurSystems() {
  const { t } = useTranslation();
  const partners = t("Systems");
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
              lineHeight: " 30px",
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
            {/* {data.map((item) => {
              return (
                <>
                  <SponserData img={item}></SponserData>
                </>
              );
            })} */}
            <InfiniteCarousel items={data}></InfiniteCarousel>
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
