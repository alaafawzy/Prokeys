import React, { useState,useContext  } from "react";
import { Box, Grid,Typography } from "@mui/material";
import InputField from "../components/InputField";
import LoginBackground from "../components/LoginBackground";
import FormFrame from "../components/FormFrame";
import { useTranslation } from "react-i18next";
import Btn from "../components/Btn";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import InputError from "../components/InputError";
import { LoginApi } from "../utils/Http";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import {ForgetPasswordApi} from "../../Api"
import { UserContext } from "../context/UserContext";
import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function Reset() {
  const { t } = useTranslation();
  const ForgetPassword = t("ForgetPassword");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {uid} = useParams();
  const {token}=useParams()
  const navigate = useNavigate();
  const schema = Joi.object({
    password: Joi.string().messages({ "string.empty": "password empty" }),
    confirm_password: Joi.string().messages({ "string.empty": "password 2 empty" }),
});
  const form = useForm({
    resolver: joiResolver(schema),
  });
  const { register, control,handleSubmit, formState, setError } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    console.log("test5")
    setSuccessMessage("");
    setErrorMessage("");
    // const URL= '/api/resetPassword/'+uid+'/set-password/'
    const URL= '/api/reset-password/'+uid+'/'+token+'/';
     axios.post(URL, data,{
        withCredentials: true
    }).then((response) => {
        if (response.status === 200) {
            // Redirect to the home page after login
            setSuccessMessage(ForgetPassword.success);
        }
    }).catch(err=>{ 
        if(err=='Invalid credentials'){setErrorMessage(ForgetPassword.fail);}   
        else{
          setErrorMessage(ForgetPassword.fail);
        }
        });
  };
  return (
    <>
      <LoginBackground>
        <FormFrame
          title={ForgetPassword.title}
          subtitle={ForgetPassword.subTitle}
          btnLable={ForgetPassword.btn}
        >
          <Grid
            container
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
              noValidate
            sx={{ display: "flex", width: "100%" }}
          >
            <Grid item container xs={12}>
              <InputField
                ele="password"
                label={ForgetPassword.password}
                xs={12}
                md={12}
                register={register}
                errors={errors}
                type="Password"
              />
              <InputField
                ele="confirm_password"
                label={ForgetPassword.confirmPassword}
                xs={12}
                md={12}
                register={register}
                errors={errors}
                type="Password"
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "end",
                height: "30px",
              }}
            >
              {Object.entries(errors).map((error, index) => {
                return <InputError key={index} message={error[1].message} />;
              })}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                fontFamily: "Tajawal",
                fontSize: "14px",
                fontWeight: " 700",
                lineHeight: " 20px",
                textAlign: "left",
                color: "#131F89",
              }}
            >
              {ForgetPassword.pass}
            </Grid>
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
            <Btn
              bg={"#131F89"}
              FontColor={"white"}
              component={"button"}
              type="Submit"
              onClick={() => {
                console.log("clickex");
              }}
            >
              {ForgetPassword.btn}
            </Btn>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                md={3}
                sx={{
                  fontFamily: "Tajawal",
                  fontSize: "14px",
                  fontWeight: " 400",
                  textAlign: "left",
                  // color: "#131F89",
                  color: "#4F4F4F",
                }}
              >
                {ForgetPassword.loginPhrase}
                <Link to="/Login" style={{ width: "100%", height: "100%" ,color: "#131F89"}}>
                  {ForgetPassword.login}
                </Link>
              </Grid>
              <Grid
                item
                md={4}
                sx={{
                  fontFamily: "Tajawal",
                  fontSize: "14px",
                  fontWeight: " 400",
                  textAlign: "left",
                  color: "#4F4F4F",
                }}
              >
                {ForgetPassword.account}<Link to="/Register" style={{ width: "100%", height: "100%",color: "#131F89" }}>
                  {ForgetPassword.create}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </FormFrame>
      </LoginBackground>
    </>
  );
}

// function FormFrame({ children, btnLable, subtitle, title }) {

//     return (
//         <>
//             <Container sx={{

//                 display: "flex",
//                 justifyContent: "center",
//             }}>
//                 <Grid container md={5} sx={{
//                     background: "white",
//                     flexDirection: "column",
//                     padding: "2rem ",
//                     borderRadius: "16px",
//                     "& > div:not(:last-child)": {
//                         marginBottom: "1.5rem",
//                     }
//                 }}>
//                     <Grid sx={{
//                         display: "flex",
//                         justifyContent: "center"
//                     }}>
//                         <img src={logo}></img>
//                     </Grid>
//                     <Grid>
//                         <Box sx={{
//                             fontFamily: "Tajawal",
//                             fontSize: "24px",
//                             fontWeight: " 700",
//                             lineHeight: " 32px",
//                             textAlign: 'center',
//                         }}>
//                             {title}
//                         </Box>
//                         <Box sx={{
//                             fontFamily: "Tajawal",
//                             fontSize: "16px",
//                             fontWeight: " 400",
//                             lineHeight: " 24px",
//                             textAlign: 'center',
//                             color: "#4F4F4F"
//                         }}>
//                             {subtitle}
//                         </Box>
//                     </Grid>
//                     {children}
//                     <Btn bg={"#131F89"} FontColor={"white"}>
//                      {btnLable}
//                     </Btn>
//                     <Grid sx={{
//                         display: "flex",
//                         flexDirection: "row-reverse",
//                         justifyContent: 'center'

//                     }} >
//                         <Grid item md={3.5} sx={{
//                             fontFamily: "Tajawal",
//                             fontSize: "14px",
//                             fontWeight: " 400",
//                             lineHeight: " 20px",
//                             textAlign: 'left',
//                             color: "#4F4F4F",

//                         }}>لا يوجد لديك حساب  ؟
//                         </Grid>

//                         <Grid item md={3} sx={{

//                             fontFamily: "Tajawal",
//                             fontSize: "14px",
//                             fontWeight: " 700",
//                             lineHeight: " 20px",
//                             textAlign: 'left',
//                             color: "#131F89"
//                         }}>حساب جديد</Grid>
//                     </Grid>
//                     <Grid sx={{
//                         display: "flex",
//                         justifyContent: "center",
//                         fontFamily: "Tajawal",
//                         fontSize: "14px",
//                         fontWeight: " 400",
//                         lineHeight: " 20px",
//                         textAlign: 'left',
//                         color: "#4F4F4F",

//                     }} >الرجوع الي الرئيسية</Grid>

//                 </Grid>

//             </Container>
//         </>
//     )

// }
