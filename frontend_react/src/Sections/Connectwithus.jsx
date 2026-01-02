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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 2rem",
        direction: theme.direction,
      }}
    >
      {/* Title Section - Standalone */}
      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: "center",
          marginBottom: "4rem"
        }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Cairo",
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: "700",
              color: "#131F89",
              marginBottom: "1rem",
            }}
          >
            {Contactus.Title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Cairo",
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            {Contactus.Desc}
          </Typography>
        </Box>
      </Container>

      {/* Form Section with Full Width Background */}
      <Box
        sx={{
          width: "100vw",
          background: "rgba(71, 193, 202, 0.08)",
          padding: "4rem 0",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <Container maxWidth="md">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              background: "transparent",
              borderRadius: "16px",
              my: 4,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: { xs: "2rem", md: "3rem" },
            }}
          >
          <Grid container spacing={1}>
            {/* Name and Company Name */}
            <Grid item xs={12} md={6} order={{sx:1,md:2}}>
              <InputField
                label={Contactus.Name}
                ele="name"
                register={register}
                errors={errors}
                type="Name"
              />
            </Grid>
            <Grid item xs={12} md={6} order={{sx:2,md:1}}>
              <InputField
                label={Contactus.Company}
                ele="company_name"
                register={register}
                errors={errors}
                type="Company"
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} order={{sx:3,md:3}}>
              <InputField
                label={Contactus.Email}
                ele="email"
                register={register}
                errors={errors}
                type="Email"
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} order={{sx:4,md:4}}>
              <PhoneField
                label={Contactus.Phone}
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
            </Grid>

            {/* Message */}
            <Grid item xs={12} order={{sx:5,md:5}}>
              <InputField
                label={Contactus.Message}
                ele="details"
                register={register}
                errors={errors}
                type="Message"
                multiline
              />
            </Grid>

            {/* Success/Error Messages */}
            {successMessage && (
              <Grid item xs={12} order={{sx:6,md:6}}>
                <Typography
                  sx={{
                    color: "#4CAF50",
                    textAlign: "center",
                    fontFamily: "Cairo",
                  }}
                >
                  {successMessage}
                </Typography>
              </Grid>
            )}

            {errorMessage && (
              <Grid item xs={12} order={{sx:6,md:6}}>
                <Typography
                  sx={{
                    color: "#f44336",
                    textAlign: "center",
                    fontFamily: "Cairo",
                  }}
                >
                  {errorMessage}
                </Typography>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12} order={{sx:7,md:7}}>
              <Box
                component="button"
                type="submit"
                disabled={isLoading}
                sx={{
                  width: "100%",
                  padding: "1rem",
                  background: "linear-gradient(90deg, #00BCD4 0%, #00ACC1 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  fontFamily: "Cairo",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  opacity: isLoading ? 0.7 : 1,
                  "&:hover": {
                    transform: isLoading ? "none" : "translateY(-2px)",
                    boxShadow: isLoading
                      ? "none"
                      : "0 4px 12px rgba(0, 188, 212, 0.4)",
                  },
                }}
              >
                {isLoading ? "...جاري الإرسال" : Contactus.Submit || "إرسال"}
              </Box>
            </Grid>
          </Grid>
        </Box>
        </Container>
      </Box>
    </Box>
  );
}
