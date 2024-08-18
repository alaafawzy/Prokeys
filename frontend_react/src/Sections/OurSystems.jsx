import React from "react";
import { Box, Grid } from "@mui/material";
import { Container } from "@mui/material";

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
          bgcolor: "rgba(249, 250, 251, 1)",
          paddingTop: "2rem",
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
              fontFamily: "Tajawal",
              fontSize: "20px",
              fontWeight: " 400",
              lineHeight: " 30px",
              textAlign: "center",
              color: "rgba(79, 79, 79, 1)",
              justifyContent: "center",
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
            }}
          >
            {data.map((item) => {
              return (
                <>
                  <SponserData img={item}></SponserData>
                </>
              );
            })}
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
