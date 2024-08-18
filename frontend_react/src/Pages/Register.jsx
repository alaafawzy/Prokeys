import React, { useState } from "react";
import LoginBackground from "../components/LoginBackground";
import FormFrame from "../components/FormFrame";
import InputField from "../components/InputField";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import InputError from "../components/InputError";
import Btn from "../components/Btn";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { RegisterApi } from "../utils/Http";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

export default function Register() {
  const theme = useTheme();
  const { t } = useTranslation();
  const registerText = t("Register");
  const [isLoading, setisLoading] = useState(false);
  //   const { checkLoggedIn } = useContext(UserContext);
  const schema = Joi.object({
    Email: Joi.string().required().messages({
      "string.empty": "Email can't be empty",
      "string.pattern.base": "Email not right",
    }),
    Name: Joi.string().required().messages({
      "string.empty": "Name can't be empty",
      "string.pattern.base": "Name not right",
    }),
    Phone: Joi.string().required().messages({
      "string.empty": "Phone can't be empty",
      "string.pattern.base": "Phone not right",
    }),
    Password: Joi.string().messages({ "string.empty": "password empty" }),
  });
  const form = useForm({
    resolver: joiResolver(schema),
  });
  const { register, handleSubmit, control, formState, setError } = form;
  const { errors } = formState;
  const onSubmit = async (inputs) => {
    console.log("firssazt", inputs);
    // setisLoading(true);
    const { data, status } = await RegisterApi(inputs);
    console.log("XX", data, status);
    // if (status) {
    //   localStorage.setItem(
    //     "USER",
    //     JSON.stringify({
    //       accessToken: data.access_token,
    //       userData: data.manager,
    //     })
    //   );
    //   checkLoggedIn();
    // } else {
    //   setError("Email", { type: "focus", message: "d" }, { shouldFocus: true });
    // }
    // setisLoading(false);
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
                direction: `${theme.direction}`,
                justifyContent: { xs: "center", md: "space-between" },
              }}
            >
              <InputField
                ele="Email"
                label={`${registerText.Email}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Email"
              />
              <InputField
                ele="Name"
                label={`${registerText.Name}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Name"
              />
              <InputField
                ele="Password"
                label={`${registerText.Password}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Password"
              />
              <InputField
                ele="Phone"
                label={`${registerText.Phone}`}
                xs={10}
                md={5.8}
                register={register}
                errors={errors}
                type="Phone"
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

            <Btn
              bg={"#131F89"}
              FontColor={"white"}
              component={"button"}
              type="Submit"
              onClick={() => {
                console.log("clickex");
              }}
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
