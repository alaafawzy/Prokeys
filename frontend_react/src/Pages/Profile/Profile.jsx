import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import InputField, { PhoneField } from "./Components/InputField";
import Joi from "joi";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { matchIsValidTel } from "mui-tel-input";
import Btn from "../../components/Btn";
import DragDrop from "./Components/DragDrop/DragDrop";

export default function Profile() {
  return (
    <Grid>
      <ProfileForm />
      <ComapnyForm />
    </Grid>
  );
}

function ProfileForm() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const schema = Joi.object({
    Name: Joi.string().required().messages({
      "string.empty": "",
    }),
    Email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .messages({
        "string.empty": "Validation.Email.req",
        "string.email": "Validation.Email.pattern",
      }),
    Phone: Joi.string()
      .required()
      .custom(PhoneVaildation, "custom validation")
      .messages({
        "string.empty": "Validation.Phone.req",
        "string.pattern.base": "Validation.Phone.pattern",
      }),
  });

  const form = useForm({
    resolver: joiResolver(schema),
  });
  const { register, handleSubmit, control, formState, reset, clearErrors } =
    form;
  const { errors } = formState;

  function PhoneVaildation(value, helpers) {
    if (matchIsValidTel(value, { onlyCountries: ["AE", "SA", "EG"] })) {
      return value;
    }
    return helpers.error("string.pattern.base");
  }

  function editInfo(val) {
    setdisabled(val);
  }
  const onSubmit = async (inputs) => {
    setisLoading(true);

    console.log("inputs", inputs);
    setisLoading(false);
  };
  return (
    <Grid>
      <Grid
        sx={{
          textAlign: theme.direction == "ltr" ? "right" : "left",
          paddingBottom: "2rem",
        }}
      >
        <Box
          sx={{
            fontFamily: "Tajawal",
            fontSize: "1.9rem",
            fontWeight: "700",
            lineHeight: "38px",
            color: "#1A1A1A",
          }}
        >
          معلومات شخصية
        </Box>
        <Box
          sx={{
            fontFamily: "Tajawal",
            fontSize: "1rem",
            fontWeight: "400",
            lineHeight: "24px",
            color: "#4F4F4F",
          }}
        >
          قم بتحديث صورتك وتفاصيلك الشخصية هنا
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        container
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          justifyContent: "center",
          "& > div:not(:first-child)": {
            paddingTop: "1rem",
          },
        }}
      >
        <InputField
          item
          label={`الاسم`}
          ele="Name"
          register={register}
          errors={errors}
          type="Name"
          disabled={disabled}
          value={"يوسف"}
        />
        <PhoneField
          label={`رقم التليفون`}
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
          disabled={disabled}
          value={"01128103702"}
        />
        <InputField
          item
          label={`البريد الالكتروني`}
          ele="Email"
          register={register}
          errors={errors}
          type="Email"
          disabled={disabled}
          value={"yousef@gmail.com"}
          verify={
            <Grid
              onClick={() => {
                console.log("sure email");
              }}
            >
              لم يتم التحقق من البريد الالكتروني الخاص بك حتي الان اضغط للتحقق
              من البريد الإلكتروني
            </Grid>
          }
        />
        <Grid item xs={10} sx={{}}>
          {disabled ? (
            <Btn
              m={".5rem"}
              W={"5rem"}
              bg={"#131F89"}
              FontColor={"#FFF"}
              onClick={() => {
                editInfo(false);
              }}
            >
              تعديل
            </Btn>
          ) : (
            <Grid sx={{ display: "flex", width: "30%" }}>
              <Btn
                bg={"#D0D5DD"}
                FontColor={"#1A1A1A"}
                m={".5rem"}
                onClick={() => {
                  editInfo(true);
                  clearErrors();
                }}
              >
                الغاء
              </Btn>
              <Btn
                bg={"#131F89"}
                FontColor={"#FFF"}
                m={".5rem"}
                component={"button"}
                type="Submit"
                onClick={() => {
                  console.log("clickex");
                }}
                isLoading={isLoading}
                disabled={isLoading}
              >
                حفظ التغيرات
              </Btn>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

function ComapnyForm() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const schema = Joi.object({
    CompanyName: Joi.string().required().messages({
      "string.empty": "",
    }),
    Descripation: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .messages({
        "string.empty": "Validation.Email.req",
        "string.email": "Validation.Email.pattern",
      }),
    Image: Joi.string()
      .required()
      .custom(PhoneVaildation, "custom validation")
      .messages({
        "string.empty": "Validation.Phone.req",
        "string.pattern.base": "Validation.Phone.pattern",
      }),
  });

  const form = useForm({
    resolver: joiResolver(schema),
  });
  const { register, handleSubmit, control, formState, reset, clearErrors } =
    form;
  const { errors } = formState;

  function PhoneVaildation(value, helpers) {
    if (matchIsValidTel(value, { onlyCountries: ["AE", "SA", "EG"] })) {
      return value;
    }
    return helpers.error("string.pattern.base");
  }

  function editInfo(val) {
    setdisabled(val);
  }
  const onSubmit = async (inputs) => {
    setisLoading(true);

    console.log("inputs", inputs);
    setisLoading(false);
  };
  return (
    <Grid>
      <Grid
        sx={{
          textAlign: theme.direction == "ltr" ? "right" : "left",
          paddingBottom: "2rem",
        }}
      >
        <Box
          sx={{
            fontFamily: "Tajawal",
            fontSize: "1.9rem",
            fontWeight: "700",
            lineHeight: "38px",
            color: "#1A1A1A",
          }}
        >
          ملف الشركة
        </Box>
        <Box
          sx={{
            fontFamily: "Tajawal",
            fontSize: "1rem",
            fontWeight: "400",
            lineHeight: "24px",
            color: "#4F4F4F",
          }}
        >
          قم بتحديث صورة الشركة وتفاصيلها هنا
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        container
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          justifyContent: "center",
          "& > div:not(:first-child)": {
            paddingTop: "1rem",
          },
        }}
      >
        <InputField
          item
          label={`اسم الشركة`}
          ele="CompanyName"
          register={register}
          errors={errors}
          type="CompanyName"
          disabled={disabled}
          value={"يوسف"}
        />
        <InputField
          item
          label={`تفاصيل`}
          ele="Descripation"
          register={register}
          errors={errors}
          type="Descripation"
          disabled={disabled}
          value={"يوسف"}
          multiline
        />
        <DragDrop />
        <Grid item xs={10} sx={{}}>
          {disabled ? (
            <Btn
              m={".5rem"}
              W={"5rem"}
              bg={"#131F89"}
              FontColor={"#FFF"}
              onClick={() => {
                editInfo(false);
              }}
            >
              تعديل
            </Btn>
          ) : (
            <Grid sx={{ display: "flex", width: "30%" }}>
              <Btn
                bg={"#D0D5DD"}
                FontColor={"#1A1A1A"}
                m={".5rem"}
                onClick={() => {
                  editInfo(true);
                  clearErrors();
                }}
              >
                الغاء
              </Btn>
              <Btn
                bg={"#131F89"}
                FontColor={"#FFF"}
                m={".5rem"}
                component={"button"}
                type="Submit"
                onClick={() => {
                  console.log("clickex");
                }}
                isLoading={isLoading}
                disabled={isLoading}
              >
                حفظ التغيرات
              </Btn>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
