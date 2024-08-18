import React from "react";
import { Grid, Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { icons } from "../Data/Samka";

export default function Feedback() {
  const { t } = useTranslation();
  const { feed1, feed2, feed3 } = t("Feedback");

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "end",
          textAlign: "end",
          fontFamily: "Tajawal",
          "& > div:not(:last-child)": {
            marginBottom: "1rem",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            "& > div:not(:last-child)": {
              marginBottom: "1rem",
            },
          }}
        >
          <Box sx={{ color: "rgba(19, 31, 137, 1)", fontWeight: "700" }}>
            {feed1?.whatTheySay}
          </Box>

          <Grid
            container
            sx={{
              justifyContent: "space-between",
              "& > div:not(:last-child)": {
                marginBottom: "1rem",
              },
              flexDirection: {},
            }}
          >
            <FeedbackCard
              svg={icons.feedback}
              customerName={feed2?.customerName}
              customerFeedback={feed2?.customerFeedback}
              customerTitle={feed2?.customerTitle}
            />
            <FeedbackCard
              svg={icons.feedback}
              customerName={feed1?.customerName}
              customerFeedback={feed1?.customerFeedback}
              customerTitle={feed1?.customerTitle}
            />

            <FeedbackCard
              svg={icons.feedback}
              customerName={feed3?.customerName}
              customerFeedback={feed3?.customerFeedback}
              customerTitle={feed3?.customerTitle}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
}

function FeedbackCard({ svg, customerName, customerTitle, customerFeedback }) {
  return (
    <>
      <Grid item xs={12} md={3.9}>
        <Grid
          container
          sx={{
            textAlign: "center",
            padding: "1rem 0",
            boxShadow: "0px 12px 16px 4px rgba(16, 24, 40, 0.08)",
            borderRadius: "1rem",
            justifyContent: "center",
            fontWeight: "700",
            "& > div:not(:last-child)": {
              marginBottom: "1rem",
            },
          }}
        >
          <Grid item xs={12}>
            {svg}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ fontSize: "20px", color: "rgba(26, 26, 26, 1)" }}>
              {customerName}
            </Box>
            <Box sx={{ fontSize: "20px", color: "rgba(26, 26, 26, 1)" }}>
              {customerTitle}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ color: "rgba(79, 79, 79, 1)", margin: "0 1rem" }}>
              {customerFeedback}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
