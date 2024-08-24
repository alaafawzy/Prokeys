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

export default function ChangePassword() {
  const { t } = useTranslation();
  const ChangePassword = t("ChangePassword");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {uid} = useParams();
  const {token}=useParams()
  const navigate = useNavigate();
  const schema = Joi.object({
    password: Joi.string().messages({ "string.empty": "password empty" }),
    password2: Joi.string().messages({ "string.empty": "password2 empty" }),
    old_password: Joi.string().messages({ "string.empty": "old password empty" }),
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
    const URL= '/api/change_password/';
     axios.put(URL, data,{
        withCredentials: true
    }).then((response) => {
        if (response.status === 200) {
            // Redirect to the home page after login
            setSuccessMessage(ChangePassword.success);
            setTimeout(() => {
              navigate('/logout'); // Replace with your target route
          }, 1000); 
        }
    }).catch(err=>{ 
        if(err=='Invalid credentials'){setErrorMessage(ChangePassword.fail);}   
        else{
          setErrorMessage(ChangePassword.fail);
        }
        });
  };
  return (
    <>
      <LoginBackground>
        <FormFrame
          title={ChangePassword.title}
          subtitle={ChangePassword.subTitle}
          btnLable={ChangePassword.btn}
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
                ele="old_password"
                label={ChangePassword.oldPassword}
                xs={12}
                md={12}
                register={register}
                errors={errors}
                type="Password"
              />
              <InputField
                ele="password"
                label={ChangePassword.password}
                xs={12}
                md={12}
                register={register}
                errors={errors}
                type="Password"
              />
              <InputField
                ele="password2"
                label={ChangePassword.confirmPassword}
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
              {ChangePassword.pass}
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
              {ChangePassword.btn}
            </Btn>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
            </Grid>
          </Grid>
        </FormFrame>
      </LoginBackground>
    </>
  );
}
