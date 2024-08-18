import React from "react";
import { Grid, Box } from "@mui/material";
import { icons } from "../Data/Samka";
import { useTheme } from "@emotion/react";
export default function BulletPoint({title}) {
  const theme = useTheme();
  return (
    <>
      <Grid sx={{ display: "flex"}}>
        <Box sx={{color:"rgba(79, 79, 79, 1)",fontWeight:"400"}}>{theme.direction=='rtl'?title?.arabic_advantage:title?.english_advantage}</Box>
        <Box  sx={{margin:"0 1rem "}}>{icons.rightArrow}</Box>
      </Grid>
    </>
  );
}
