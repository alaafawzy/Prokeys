import React from "react";
import { Grid, Box } from "@mui/material";
import { Container } from "@mui/material";
import pic from "../assets/picFrame.jpeg";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Question_array } from "../components/Question_array";
// import { Question } from "../Sections/FAQ";

export default function AboutUs() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Who = t("AboutUs");
  const { Q1, Q2, Q3 } = t("AboutUs");
  
  return (
    <Grid>
      <Container
        sx={{
          width: "100%",
          justifyContent: "center",
          "& > div:not(:last-child)": {
            marginBottom: "4rem",
          },
        }}
      >
        <Grid
          continer
          sx={{
            "& > div:not(:first-child)": {
              marginBottom: "1.5rem",
              fontFamily: "Tajawal",
              fontSize: "1.3rem",
              fontWeight: "400",
              lineHeight: "30px",
              textAlign: "center",
              color: "#4F4F4F",
            },
          }}
        >
          <Grid
            item
            sx={{
              fontFamily: "Tajawal",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "24px",
              textAlign: "center",
              color: "#131F89",
              marginBottom: "2rem",
            }}
          >
            {Who.title}
          </Grid>
          <div>{Who.desc1}</div>
          <div>{Who.desc2}</div>
          <div>{Who.desc3}</div>
          <div>{Who.desc4}</div>

          {/* <Grid
            item
            sx={{
              fontFamily: "Tajawal",
              fontSize: "20px",
              fontWeight: "700",
              lineHeight: "33px",
              textAlign: "center",
              color: "#1A1A1A",
              background: "#F9FAFB",
              padding: "2rem",
            }}
          >
            {Who.desc2}
          </Grid> */}
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "center",
            textAlign: "end",
            marginBottom: "3rem",
          }}
        >
          <Question_array
            ques={Q1.Question}
            ans={Array.isArray(Q1.Answer) ? Q1.Answer : []}
            bg={"#F9FAFB"}
          />
          <Question_array
            ques={Q2.Question}
            ans={Array.isArray(Q2.Answer) ? Q2.Answer : []}
            bg={"#F9FAFB"}
          />
          <Question_array
            ques={Q3.Question}
            ans={Array.isArray(Q3.Answer) ? Q3.Answer : []}
            bg={"#F9FAFB"}
          />
        </Grid>
        {/* <Grid
          container
          sx={{
            justifyContent: "center",
            "& > div:not(:last-child)": {
              marginBottom: "3rem",
            },
          }}
        >
          <Grid
            item
            sx={{
              fontFamily: "Tajawal",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "24px",
              textAlign: "center",
              color: "#131F89",
            }}
          >
            {Who.OurTeam}
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              direction: `${theme.direction == "ltr" ? "rtl" : "ltr"}`,
              rowGap:"2rem"
            }}
          >
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
            <PicFrame name={Who.name} position={Who.position} />
          </Grid>
        </Grid> */}
      </Container>
    </Grid>
  );
}
