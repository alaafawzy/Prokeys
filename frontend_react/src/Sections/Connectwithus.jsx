import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import InputField, { PhoneField } from "../components/InputField";
import { useTheme } from "@emotion/react";
import Btn from "../components/Btn";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { sendMessage } from "../utils/Http";
import toast from "react-hot-toast";
import { matchIsValidTel } from "mui-tel-input";

export default function Connectwithus() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Contactus = t("Contactus");
  const Validation = t("Validation");
  const [isLoading, setisLoading] = useState(false);
  const [sentMess, setsentMess] = useState(true);

  const schema = Joi.object({
    Name: Joi.string().required().messages({
      "string.empty": Validation?.Name || "Name is required",
    }),
    Company: Joi.string().optional().allow("").messages({}),
    Email: Joi.string()
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
    Message: Joi.string().messages({
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

  const notify = (status) => {
    if (status) {
      return toast.success(Contactus.SentSucc);
    } else {
      return toast.error(Contactus.SentErr);
    }
  };

  const onSubmit = async (inputs) => {
    setisLoading(true);
    const { data, status } = await sendMessage(inputs);
    if (status) {
      reset({ Name: "", Email: "", Phone: "", Company: "", Message: "" });
      notify(status);
    } else {
      notify(status);
    }
    setisLoading(false);
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
          ele="Name"
          register={register}
          errors={errors}
          type="Name"
        />
        <InputField
          item
          xs={12}
          md={5.5}
          label={`${Contactus.Company}`}
          ele="Company"
          register={register}
          errors={errors}
          type="Company"
        />

        <InputField
          item
          xs={12}
          md={12}
          label={`${Contactus.Email}`}
          ele="Email"
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
          ele="Message"
          register={register}
          errors={errors}
          type="Message"
          multiline
        />
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
