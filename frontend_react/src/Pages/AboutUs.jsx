import React, { useState, useEffect } from 'react';
import { Grid, Box } from "@mui/material";
import { Container } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { usePageMetadata } from "../hooks/useMetadata";
import { Question_array } from "../components/Question_array";
import api from '../../Api';
import Feedback from '../Sections/Feedback';
import OurSystems from '../Sections/OurSystems';
import AboutWithRightPic from '../Sections/AboutRightpic';
import SectionsWithLeftPic from '../Sections/AboutLeftPic';
import { Description } from '@mui/icons-material';
// import { Question } from "../Sections/FAQ";

// Load metadata for about page

export default function AboutUs() {
  usePageMetadata('about');

  const theme = useTheme();
  const { t } = useTranslation();
  const Who = t("AboutUs");
  const { Q1, Q2, Q3 } = t("AboutUs");
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rtl = theme.direction === 'rtl';


  useEffect(() => {
    // Fetch About Us data and sections from API
    const fetchData = async () => {
      try {
        // Fetch About Us info
        const aboutResponse = await api.get('/aboutUs/');
        if (aboutResponse.data) {
          setData(aboutResponse.data[0]);
        }
        
        // Fetch About Sections
        const sectionsResponse = await api.get('/about/sections/');
        if (sectionsResponse.data) {
          setSections(sectionsResponse.data);
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
  const textStyle = {
    whiteSpace: 'pre-line', // preserves newlines
  };
  
  // Map API data to component format
  const sec_data = sections?.map(section => ({
    title: rtl ? section.arabic_title : section.english_title,
    description: rtl ? section.arabic_content : section.english_content,
    section_image: section.section_image,
    image_alt_text: section.image_alt_text,
  }));
  // console.log(sec_data)
  return (
    <Grid dir={rtl ? 'rtl' : 'ltr'}>
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
              fontFamily: "Cairo",
              fontSize: "1.3rem",
              fontWeight: "400",
              lineHeight: "30px",
              // textAlign: rtl ? "start" : "end",
              color: "#4F4F4F",
            },
          }}
        >
          <Grid
            item
            sx={{
              fontFamily: "Cairo",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "24px",
              textAlign: "center",
              color: "#131F89",
              marginBottom: "3rem",
              marginTop: "3rem",
            }}
          >
            {rtl ? data?.arabic_title : data?.english_title}
            
                  </Grid>
                  <div 
                  
                  dangerouslySetInnerHTML={{ 
                    __html: rtl ? data?.arabic_description : data?.english_description 
                  }}
                  />
                  
                </Grid>
                <Grid
                  container
                  sx={{
                  justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
      {sec_data?.map((section, index) =>
        index % 2 === 0 ? (
          <AboutWithRightPic key={index} data={section} />
        ) : (
          <SectionsWithLeftPic key={index} data={section} />
        )
      )}
          <OurSystems />
          <Feedback/>
        </Grid>
      </Container>
    </Grid>
  );
}
