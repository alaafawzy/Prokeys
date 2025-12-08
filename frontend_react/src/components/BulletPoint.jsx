import React from "react";
import { Grid, Box } from "@mui/material";
import { icons } from "../Data/Samka";
import { useTheme } from "@emotion/react";
import CheckIcon from "@mui/icons-material/Check";
export default function BulletPoint({title}) {
  const theme = useTheme();
  return (
    <>
      <Grid sx={{ display: "flex"}}>
        <Box sx={{color:"#333333",fontWeight:"medium",fontSize:"1rem"}}>{theme.direction=='rtl'?title?.arabic_advantage:title?.english_advantage}</Box>
        {/* <Box  sx={{margin:"0 1rem "}}>{icons.rightArrow}</Box> */}
        <Box>
          <CheckIcon sx={{ color: "#00A63E", fontSize: 18, mr: 1 }} />
        </Box>
      </Grid>
    </>
  );
}
