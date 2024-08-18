import React from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import video from "../assets/video.webm";

export default function KnowMore({title}) {
  const { t } = useTranslation();
  const KnowMore = t("KnowMore");
  return (
    <>
      <Container
        sx={{
          fontFamily: "Tajawal",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            "& > div:not(:last-child)": {
                marginBottom: "1rem",
              },
          }}
        >
          {title?<Box sx={{ color: "rgba(19, 31, 137, 1)", fontWeight: "700" }}>
            {KnowMore.title}
          </Box> :"" }
          
          <Box>
            <ReactPlayer
              url={video} // Replace with your video URL
              width="100%"
              height="516px"
              controls={true}
             
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
