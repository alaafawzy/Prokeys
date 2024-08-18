import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import client1 from "../assets/client1.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";
import client5 from "../assets/client5.png";
import { useTranslation } from "react-i18next";

// const data = [client1, client2, client3, client4, client5];
const data = [
  "Kel.12",
  "Nebrass",
  "Me.mphis Tour",
  "Salsaiaa Cruise",
  "Dwaa Cruise",
  "Staric onics",
  "Watad architecture",
  "Rakeyn",
  "Bluemeel",
];

export default function OurClient() {
  const { t } = useTranslation();
  const partners = t("partners");
  return (
    <>
      <Grid sx={{ bgcolor: "rgba(249, 250, 251, 1)", paddingTop: "2rem" }}>
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
              padding: "1rem 0",
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              scrollSnapType: "x mondatory",
              scrollPadding: "1rem",
              scrollbarWidth: "none",
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
        xs={4}
        md={5}
        sx={{
          background: "white",
          color: "#131f89",
          minWidth: "200px",
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: ".5rem",
          padding: "1rem",
          boxSizing: "border-box",
          fontFamily: "Tajawal",
          border: "2px solid #f0f0f0",
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight:"700"
        }}
      >
        {img}
      </Grid>
    </>
  );
}
