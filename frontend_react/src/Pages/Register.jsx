import React, { useState } from "react";
import LoginBackground from "../components/LoginBackground";
import FormFrame from "../components/FormFrame";
import InputField from "../components/InputField";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import InputError from "../components/InputError";
import Btn from "../components/Btn";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { RegisterApi } from "../../Api";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

export default function Register() {
  const theme = useTheme();
  const { t } = useTranslation();
  const registerText = t("Register");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const schema = Joi.object({
    first_name: Joi.string().required().messages({
      "string.empty": "Name can't be empty",
      "string.pattern.base": "Name not right",
    }),
    last_name: Joi.string().required().messages({
      "string.empty": "Name can't be empty",
      "string.pattern.base": "Name not right",
    }),
    email: Joi.string().required().messages({
      "string.empty": "Email can't be empty",
      "string.pattern.base": "Email not right",
    }),
    password: Joi.string().messages({ "string.empty": "Password empty" }),
    phone: Joi.string().required().messages({
      "string.empty": "Phone can't be empty",
      "string.pattern.base": "Phone not right",
    }),
    tax_record: Joi.any().optional(),
  });

  const form = useForm({
    resolver: joiResolver(schema),
  });

  const { register, handleSubmit, control, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (inputs) => {
    try {
      setIsLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      const response = await RegisterApi(
        inputs.first_name,
        inputs.last_name,
        inputs.email,
        inputs.password,
        inputs.phone,
        inputs.tax_record[0]
      );
      console.log(response)
      if (response.status === '201') { // assuming 201 is the status code for success
        setSuccessMessage(registerText.Success);
        reset(); // Clear the form fields
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginBackground>
        <FormFrame title={registerText.title} subtitle={registerText.subTitle}>
          <Grid
            container
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", width: "100%" }}
          >
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                direction: `${theme.direction==='rtl'?'ltr':'rtl'}`,
                justifyContent: { xs: "center", md: "space-between" },
              }}
            >
              <InputField
                ele="first_name"
                label={`${registerText.FirstName}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Name"
              />
              <InputField
                ele="last_name"
                label={`${registerText.LastName}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Name"
              />
              <InputField
                ele="email"
                label={`${registerText.Email}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Email"
              />
              <InputField
                ele="password"
                label={`${registerText.Password}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Password"
              />
              <InputField
                ele="phone"
                label={`${registerText.Phone}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Phone"
              />
              <InputField
                ele="tax_record"
                label={`${registerText.Image}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="File"
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
              {Object.entries(errors).map((error, index) => (
                <InputError key={index} message={error[1].message} />
              ))}
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
              isLoading={isLoading}
            >
              {registerText.btn}
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
                <Link to="/Login" style={{ width: "100%", height: "100%" }}>
                  {registerText.create}
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
                {registerText.account}
              </Grid>
            </Grid>
          </Grid>
        </FormFrame>
      </LoginBackground>
    </>
  );
}
