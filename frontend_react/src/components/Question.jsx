
import { icons } from "../Data/Samka.jsx";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import { useState } from "react";

export function Question({ ques, ans, bg }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={10} md={12}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid rgba(234, 236, 240, 1)",
          "&:before": {
            display: "none",
          },
          background: bg,
        }}
      >
        <AccordionSummary
          expandIcon={expanded ? icons.minus : icons.plus}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            flexDirection: "row-reverse",
            "& .MuiAccordionSummary-content": {
              flexDirection: "column",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              fontFamily: "Tajawal",
              color: "rgba(26, 26, 26, 1)",
            }}
          >
            {ques}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{
              fontWeight: "400",
              fontFamily: "Tajawal",
              color: "rgba(79, 79, 79, 1)",
            }}
          >
            {ans}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}
