import React, { useEffect, useState } from "react";
import { Box, Container, Grid,Typography } from "@mui/material";
import InputField, { PhoneField } from "../components/InputField";
import { useTheme } from "@emotion/react";
import Btn from "../components/Btn";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { matchIsValidTel } from "mui-tel-input";
import {ContactUsApi} from "../../Api"
export default function Connectwithus() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Contactus = t("Contactus");
  const Validation = t("Validation");
  const [isLoading, setisLoading] = useState(false);
  const [sentMess, setsentMess] = useState(true);

  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": Validation?.Name || "Name is required",
    }),
    company_name: Joi.string().optional().allow("").messages({}),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .messages({
        "string.empty": Validation?.Email?.req || "Email is required",
        "string.email": Validation?.Email?.pattern || "Invalid email format",
      }),
    Phone: Joi.string()
      .required()
      .custom(PhoneVaildation, "custom validation")
      .messages({
        "string.empty": Validation?.Phone?.req || "Phone is required",
        "string.pattern.base": Validation?.Phone?.pattern || "Invalid phone number",
      }),
      details: Joi.string().messages({
      "string.empty": Validation?.Message || "Message is required",
    }),
  });
  const form = useForm({
    resolver: joiResolver(schema),
  });
  const { register, handleSubmit, control, formState, reset } = form;
  const { errors } = formState;

  function PhoneVaildation(value, helpers) {
    if (matchIsValidTel(value, { onlyCountries: ["AE", "SA", "EG"] })) {
      return value;
    }
    return helpers.error("string.pattern.base");
  }

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (inputs) => {
    console.log(inputs.name)
    const success  = await ContactUsApi(inputs.name,inputs.company_name,inputs.email,inputs.Phone,inputs.details);
    
    if (success.status===200) {
      setSuccessMessage(Contactus.SentSucc);
    } else {
      setErrorMessage(Contactus.SentErr);
    }
  };

  return (
    <Container
      container
      sx={{
        direction: `${theme.direction}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          fontFamily: "Tajawal",
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "30px",
          textAlign: "center",
          padding: "1rem 0",
        }}
      >
        <Box sx={{ color: "#131F89" }}>{Contactus.Title}</Box>
        <Box>{Contactus.Desc}</Box>
      </Grid>

      {/* {sentMess ? (
        <Grid
          item
          xs={10}
          md={6}
          container
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Box>لقد تم ارسال استفسارك</Box>

          <Btn
            item
            xs={12}
            md={12}
            bg={"#131F89"}
            FontColor={"white"}
            W={"100%"}
            h={"60px"}
            component={"button"}
            type="Submit"
            onClick={() => {
              console.log("clickex");
            }}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {Contactus.Message}
          </Btn>
        </Grid>
      ) : ( */}
      <Grid
        item
        xs={10}
        md={6}
        container
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <InputField
          item
          xs={12}
          md={5.5}
          label={`${Contactus.Name}`}
          ele="name"
          register={register}
          errors={errors}
          type="Name"
        />
        <InputField
          item
          xs={12}
          md={5.5}
          label={`${Contactus.Company}`}
          ele="company_name"
          register={register}
          errors={errors}
          type="Company"
        />

        <InputField
          item
          xs={12}
          md={12}
          label={`${Contactus.Email}`}
          ele="email"
          register={register}
          errors={errors}
          type="Email"
        />

        <PhoneField
          label={`${Contactus.Phone}`}
          ele="Phone"
          register={register("Phone", {
            validate: {
              positive: (value) => {
                matchIsValidTel(value, {
                  onlyCountries: ["AE", "SA", "EG"],
                });
              },
            },
          })}
          errors={errors}
          type="Phone"
          control={control}
        />

        <InputField
          item
          xs={12}
          md={12}
          label={`${Contactus.Message}`}
          ele="details"
          register={register}
          errors={errors}
          type="Message"
          multiline
        />
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
          item
          xs={12}
          md={12}
          bg={"#131F89"}
          FontColor={"white"}
          W={"100%"}
          h={"60px"}
          component={"button"}
          type="Submit"
          onClick={() => {
            console.log("clickex");
          }}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {Contactus.Message}
        </Btn>
      </Grid>
      {/* )} */}
    </Container>
  );
}
