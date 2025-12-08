
import { icons } from "../Data/Samka.jsx";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography,Divider } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Question({ ques, ans, bg }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={10} md={12} sx={{ mb: 2 }}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{
          boxShadow: "none",
          border:"1px solid #27307F",
          
              // padding: 1,
          "&:before": {
            display: "none",
            
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
              fontFamily: "Cairo",
              color: "#101828",
            }}
          >
            {ques}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ width: "100%", borderColor: "#000000", mb:3 ,fontWeight: "bold",borderBottomWidth: 2 }} />
          <Typography
            sx={{
              fontWeight: "400",
              fontFamily: "Cairo",
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
