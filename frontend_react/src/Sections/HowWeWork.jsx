import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Session from "../components/Session";

export default function HowWeWork() {
  const { t } = useTranslation();
  const HowWeWork = t("HowWeWork");
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",          
          alignContent:"end",
          textAlign: "end",
          fontFamily: "Tajawal",
          "& > div:not(:last-child)": {
            marginBottom: "1rem",
          },
        }}
      >
        <Box
          sx={{
           display:"flex",
           flexDirection: "column",     
           textAlign: "center",
          }}
        >
          <Box sx={{ color: "rgba(19, 31, 137, 1)",fontWeight:"700" }}>{HowWeWork.howTitle}</Box>
          <Box sx={{ fontSize: "24px", color: "rgba(79, 79, 79, 1)" }}>
            {HowWeWork.howDesc}
          </Box>
        </Box>

        <Box
          sx={{
            "& > div:not(:last-child)": {
              marginBottom: "1rem",
              borderEnd:"1px solid red"
            },
          }}
        >
          <Session
            title={HowWeWork.sesstionTitle1}
            desc={HowWeWork.sesstionDesc1}
          />
          <Session
            title={HowWeWork.sesstionTitle2}
            desc={HowWeWork.sesstionDesc2}
          />
          <Session
            title={HowWeWork.sesstionTitle3}
            desc={HowWeWork.sesstionDesc3}
          />
        </Box>
      </Container>
    </>
  );
}
