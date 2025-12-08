import React, { useState, useEffect } from 'react';
import { Grid, Box } from "@mui/material";
import { Container } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Question_array } from "../components/Question_array";
import api from '../../Api';
import Feedback from '../Sections/Feedback';
import OurSystems from '../Sections/OurSystems';
import AboutWithRightPic from '../Sections/AboutRightpic';
// import { Question } from "../Sections/FAQ";

export default function AboutUs() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Who = t("AboutUs");
  const { Q1, Q2, Q3 } = t("AboutUs");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/aboutUs/'); // Adjust endpoint as needed
        console.log(response.data[0]);
        
        if (response.data) {
          setData(response.data[0]);
        } else {
          // Set data to an empty array if the response is not an array
          setData([]);
        }
        // setData(response.data);
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
  const textStyle = {
    whiteSpace: 'pre-line', // preserves newlines
  };
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
            {theme.direction=='rtl'?data.arabic_title:data.english_title}
            {/* {Who.title} */}
          </Grid>
          <div style={textStyle}>{theme.direction=='rtl'?data.arabic_description:data.english_description}</div>
          
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "center",
            textAlign: "end",
            marginBottom: "3rem",
          }}
        >

          <AboutWithRightPic />
          <AboutWithRightPic  imageOnRight={true}/>
          <AboutWithRightPic />
          <OurSystems />
          <Feedback/>
          {/* <Question_array
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
          /> */}
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
