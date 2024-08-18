import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import Btn from "../components/Btn";
import { Link } from "react-router-dom";

export default function BookYourSession() {
  const { t } = useTranslation();
  const Book = t("Book");
  return (
    <>
      <Grid
        sx={{
          bgcolor: "rgba(249, 250, 251, 1)",
        }}
      >
        <Container>
          <Grid
            Container
            sx={{
              display: "flex",
              flexDirection: {
                md: "row-reverse",
                xs: "column",
              },

              justifyContent: "space-between",
              padding: {
                md: "4rem",
                xs: "0.5rem",
              },
            }}
          >
            <Grid
              item
              md={5}
              xs={11}
              sx={{
                fontFamily: "Tajawal",
                fontSize: "24px",
                fontWeight: " 700",
                lineHeight: " 36px",
                textAlign: "center",
                color: " rgba(26, 26, 26, 1)",
                width: {
                  md: "60%",
                  xs: "100%",
                },
                marginBottom: {
                  md: "0rem",
                  xs: "1rem",
                },
              }}
            >
              {Book.des}
            </Grid>
            <Grid
              item
              md={5}
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to="/ContactUs">
                <Btn
                  bg={"rgba(19, 31, 137, 1)"}
                  FontColor={"white"}
                  H={"60px"}
                  W={"200px"}
                >
                  {Book.btn}
                </Btn>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
