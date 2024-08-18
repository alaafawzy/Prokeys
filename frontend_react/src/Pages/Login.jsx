import React, { useState,useContext  } from "react";
import { Box, Grid } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import {login} from "../../Api"
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { t } = useTranslation();
  const Login = t("Login");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [isLoading, setisLoading] = useState(false);
  //   const { checkLoggedIn } = useContext(UserContext);
  const schema = Joi.object({
    Email: Joi.string().required().messages({
      "string.empty": "Email can't be empty",
      "string.pattern.base": "Email not right",
    }),

    Password: Joi.string().messages({ "string.empty": "password empty" }),
  });
  const form = useForm({
    resolver: joiResolver(schema),
  });
  const { register, control,handleSubmit, formState, setError } = form;
  const { errors } = formState;
  // const { fetchUserData } = useContext(UserContext);
  const onSubmit = async (data) => {
    // console.log(data.Password);
    // console.log(data.Email);
    const success  = await login(data.Email,data.Password);
    if (success) {
      console.log(success.user);
      setUser(success.user);
      navigate('/')
    } else {
      console.error('Login failed');
      // Show error message
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const success = await login(username, password);
  //   if (success) {
  //     console.log('Login successful');
  //     // Fetch user data after successful login
  //     // fetchUserData();
  //     // Redirect or update UI
  //     navigate('/')
  //   } else {
  //     console.error('Login failed');
  //     // Show error message
  //   }
  // };
  return (
    <>
      <LoginBackground>
        <FormFrame
          title={Login.title}
          subtitle={Login.subTitle}
          btnLable={Login.btn}
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
                ele="Email"
                label={`${Login.email}`}
                xs={12}
                md={12}
                register={register}
                errors={errors}
                type="Email"
              />
              <InputField
                ele="Password"
                label={Login.password}
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
              {Login.pass}
            </Grid>
            <Btn
              bg={"#131F89"}
              FontColor={"white"}
              component={"button"}
              type="Submit"
              onClick={() => {
                console.log("clickex");
              }}
            >
              {Login.btn}
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
                  fontWeight: " 700",
                  textAlign: "left",
                  color: "#131F89",
                  cursor: "pointer",
                }}
              >
                <Link to="/Register" style={{ width: "100%", height: "100%" }}>
                  {Login.create}
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
                {Login.account}
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
