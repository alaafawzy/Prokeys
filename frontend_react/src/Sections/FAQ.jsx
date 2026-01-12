import React, { useState,useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { icons } from "../Data/Samka";
import { useTranslation } from "react-i18next";
import { Question } from "../components/Question";
import { useTheme } from "@emotion/react";
import api from '../../Api';
export default function FAQ() {
  const { t } = useTranslation();
  const { Q1, Q2, Q3, Q4 } = t("FQA");
  const { btn, desc, other, title1 } = t("CommonQues");
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/faq/'); // Adjust endpoint as needed
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          // Set data to an empty array if the response is not an array
          setData([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignContent: "end",
          textAlign: "end",
          fontFamily: "Cairo",
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
            fontFamily:"Cairo",
          }}
        >
          <Box sx={{ color: "#27307F", fontWeight: "700", fontSize:"2.2rem",marginTop:3,marginBottom:3}}>
            {title1}
          </Box>
        </Box>
        <Box >
            {data?.map((Q,idx)=>{
              return (<Question ques={theme.direction=='rtl'?Q.arabic_question:Q.english_question} ans={theme.direction=='rtl'?Q.arabic_answer:Q.english_answer} bg={"#F9FAFB"} />)
            })}
          {/* <Question ques={Q2?.Question} ans={Q2?.Answer} bg={"#F9FAFB"} />
          <Question ques={Q3?.Question} ans={Q3?.Answer} bg={"#F9FAFB"} />
          <Question ques={Q1?.Question} ans={Q1?.Answer} bg={"#F9FAFB"} />
          <Question ques={Q4?.Question} ans={Q4?.Answer} bg={"#F9FAFB"} /> */}
        </Box>
      </Container>
    </>
  );
}
