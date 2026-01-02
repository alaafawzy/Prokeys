import React from "react";
import { useContext, useEffect, useState } from "react";
import { Grid, Box, Container,Button,TextField,Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
import { icons } from "../Data/Samka";
import Btn from "../components/Btn";
import { useTheme } from "@emotion/react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import { AddFeedback } from "../../Api";
import api from "../../Api";
import ReviewCarousel from "../components/feedbackCarousel";
export default function Feedback() {
  const { t } = useTranslation();
  const { feed1,addFeedback,yourRole,yourFeedback ,submitFeedback,successSubmit,errorSubmit} = t("Feedback");
  const theme = useTheme();
  // const { user } = useContext(UserContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [feedback, setFeedback] = useState({ text: "", role: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const navigate = useNavigate();
  // const handleAddFeedback = () => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //   } else {
  //     navigate("/login"); // Redirect to login page
  //   }
  // };
//   const handleFeedbackSubmit = async () => {
//   try {
//     setSuccessMessage("");
//     setErrorMessage("");
//     const response = await AddFeedback(feedback.text, feedback.role);
//     console.log(response);

//     if (response.status === 201) { // assuming 201 is the status code for success
//       setSuccessMessage(successSubmit);
//       // setFeedback({ ...feedback, text: "" });
//       setFeedback({ ...feedback, role: "" ,text:""});
//       setRefresh("done");
//     } else {
//       setErrorMessage(errorSubmit);
//     }
//   } catch (error) {
//     setErrorMessage(error.message || "An unexpected error occurred.");
//   }
// };
useEffect(() => {
  // Fetch data when the component mounts
  const fetchData = async () => {
    try {
      const response = await api.get('/all-comments/'); // Adjust endpoint as needed
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
  // console.log("why?")
  fetchData();
}, [refresh]);
  // console.log("data",data);
  return (
    <>
      <Grid
        sx={{
          width:"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            marginTop:5,
            "& > div:not(:last-child)": {
              marginBottom: "1rem",
            },
          }}
        >
          <Box sx={{ color: "#27307F", fontWeight: "700",fontSize:"2.2rem" }}>
            {feed1?.whatTheySay}
          </Box>
          <Box >
            {feed1?.subtitle}
          </Box>

          <Grid
            dir = {theme.direction === 'rtl' ? 'ltr' : 'rtl'}
            sx={{
              width:"100%",
              display:'flex',
              flexWrap: "nowrap",
              marginTop:5,
              // justifyContent: "space-between",
              "& > div:not(:last-child)": {
                marginBottom: "1rem",
              },
            }}
          >
            {/* {data?.map((feed,idx)=>{
              return (<FeedbackCard svg={icons.feedback}
                customerName={feed?.user_first_name+" "+feed?.user_last_name}
                customerFeedback={feed?.description}
                customerTitle={feed?.role} />)
            })} */}
            <ReviewCarousel items={data}></ReviewCarousel>
          </Grid>
          {/* <Button
            sx={{ marginTop: "1rem", alignSelf: "center",color:"white" ,
              background:"#131F89",cursor:"pointer",fontFamily: `${theme.fontFamily}`,
              fontSize: ".8rem",
              fontWeight: "700",
              lineHeight: "24px",
              height: "40px",
              width: "200px",
              padding: "0 1rem",
              boxSizing: "border-box",
              borderRadius: "10px",
            }}
            variant="contained"
            // onClick={handleAddFeedback}
          >
            {addFeedback}
          </Button> */}
          {/* {isLoggedIn && (
            <Box sx={{ marginTop: "1rem", textAlign: "left" }}>
              <TextField
                fullWidth
                variant="outlined"
                label={yourFeedback}
                value={feedback.text}
                onChange={(e) => setFeedback({ ...feedback, text: e.target.value })}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label={yourRole}
                value={feedback.role}
                onChange={(e) => setFeedback({ ...feedback, role: e.target.value })}
                sx={{ marginBottom: "1rem" }}
              >
              </TextField>
              {successMessage && (
              <Typography color="success.main" sx={{ marginBottom: 2 }}>
                {successMessage}
              </Typography>
            )}

            {errorMessage && (
              <Typography color="error.main" sx={{ marginBottom: 2 }}>
                {errorMessage}
              </Typography>
            )}
              <Button variant="contained"
                sx={{
                  background:"#131F89",cursor:"pointer",fontFamily: `${theme.fontFamily}`,
                  marginTop: "1rem", alignSelf: "center",color:"white" ,
                  fontSize: ".8rem",
                  fontWeight: "700",
                  lineHeight: "24px",
                  height: "40px",
                  padding: "0 1rem",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                  width: "80px",
                }}
                onClick={handleFeedbackSubmit }>
                {submitFeedback}
              </Button>
            </Box>
          )} */}
        </Box>
      </Grid>
    </>
  );
}

function FeedbackCard({ svg, customerName, customerTitle, customerFeedback }) {
  return (
    <>
      <Grid item xs={12} md={3.9}>
        <Grid
          container
          sx={{
            textAlign: "center",
            padding: "1rem 0",
            border:"3px solid #27307F",
            boxShadow: "0px 12px 16px 4px rgba(16, 24, 40, 0.08)",
            borderRadius: "1rem",
            justifyContent: "center",
            width:"350px",
            margin:"15px",
            fontWeight: "700",
            "& > div:not(:last-child)": {
              marginBottom: "1rem",
            },
          }}
        >
          <Grid item xs={12}>
            {svg}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ fontSize: "20px", color: "rgba(26, 26, 26, 1)" }}>
              {customerName}
            </Box>
            <Box sx={{ fontSize: "20px", color: "rgba(26, 26, 26, 1)" }}>
              {customerTitle}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ color: "rgba(79, 79, 79, 1)", margin: "0 1rem" }}>
              {customerFeedback}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
