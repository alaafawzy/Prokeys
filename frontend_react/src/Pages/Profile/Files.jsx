import React from 'react'
import StepperComp from '../../components/Stepper'
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function Files() {
  const { t } = useTranslation();
  const { Service, Desc } = t("Profile/Files");
  return (<>
    <Grid sx={{
      marginBottom: "2rem"
    }}>
      <Box sx={{
        color: "#1A1A1A",
        fontFamily: "Tajawal",
        fontWeight: 700,
        fontSize: "30px"
      }}>
        {Service}
      </Box>
      <Box sx={{
        color: "#4F4F4F",
        fontFamily: "Tajawal",
        fontWeight: 400,
        fontSize: "16px"
      }}>
        {Desc}
      </Box>
    </Grid>
    <StepperComp />
  </>

  )
}
