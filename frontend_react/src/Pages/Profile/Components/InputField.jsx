import React from "react";
import { FormControlLabel, FormHelperText, FormLabel, Grid, RadioGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@emotion/react";
import { MuiTelInput } from "mui-tel-input";
import { Controller } from "react-hook-form";

function FormHelperTextProps(indicator, dir, verify) {
  return {
    textAlign: `${dir == "ltr" ? "right" : "left"}`,
    color: verify ? "#FFCC3D" : "#fff !important",
    backgroundColor: `${indicator ? "red" : "transparent"}`,
    fontFamily: "inherit",
    borderRadius: "5px",
    boxSizing: "border-box",
    padding: "5px",
    width: "100%",
    margin: 0,
    marginTop: ".2rem",
  };
}
const BootstrapInput = styled(InputBase)(({ theme, errors, verify }) => ({
  "& .MuiInputBase-input": {
    padding: "5px",
    borderRadius: 4,
    position: "relative",
    border: "1px solid",
    borderColor: errors ? "red" : verify ? "#FFCC3D" : "#E0E3E7",
    fontSize: 16,
    width: "100%",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: ["Tajawal"].join(","),
    "&:focus": {
      borderColor: errors
        ? "red"
        : verify
          ? "#FFCC3D"
          : theme.palette.primary.main,
    },
  },
}));

export default function InputField({
  register,
  ele,
  type,
  label,
  multiline,
  errors,
  disabled,
  value,
  verify = false,
}) {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexFlow: "row-reverse wrap",
        justifyContent: "end",
        alignItems: "baseline",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          fontFamily: "Tajawal",
          fontSize: ".9rem",
          fontWeight: "500",
          lineHeight: "20px",
          padding: { xs: ".5rem 0", md: "0 .5rem" },
        }}
      >
        <Grid
          sx={{
            margin: "0 .5rem",
            display: { xs: !verify ? "none" : "block", md: "none" },
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99967 5.33301V7.99967M7.99967 10.6663H8.00634M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967Z"
              stroke="#FFCC3D"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Grid>
        {label}
      </Grid>

      <Grid item xs={12} md={5} sx={{ direction: `${theme.direction}` }}>
        <FormControl
          variant="standard"
          fullWidth
          sx={{
            direction: `${theme.direction == "ltr" ? "rtl" : "ltr"}`,
            display: "flex",
          }}
        >
          <BootstrapInput
            defaultValue={value}
            id={`${label}-input`}
            size="small"
            fullWidth
            type={type}
            {...register(ele)}
            multiline={multiline}
            rows={4}
            errors={errors[ele]}
            disabled={disabled}
            verify={verify}
          />
          <FormHelperText
            sx={FormHelperTextProps(errors[ele], theme.direction, verify)}
          >
            {errors[ele] ? errors[ele].message : verify ? verify : " "}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid
        sx={{
          margin: "0 .5rem",
          display: { xs: "none", md: !verify ? "none" : "block" },
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.99967 5.33301V7.99967M7.99967 10.6663H8.00634M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967Z"
            stroke="#FFCC3D"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Grid>
    </Grid>
  );
}

export function PhoneField({
  register,
  ele,
  label,
  control,
  errors,
  disabled,
  value,
}) {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexFlow: "row-reverse wrap",
        justifyContent: "end",
        alignItems: "baseline",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          fontFamily: "Tajawal",
          fontSize: ".9rem",
          fontWeight: "500",
          lineHeight: "20px",
          padding: { xs: ".5rem 0", md: "0 .5rem" },
        }}
      >
        {label}
      </Grid>

      <Grid item xs={12} md={5}>
        <Controller
          name={"Phone"}
          control={control}
          defaultValue={value}
          render={({
            field: {
              name,
              ref: fieldRef,
              onBlur,
              onChange,
              value,
              ...fieldProps
            },
            fieldState,
          }) => (
            <Grid>
              <MuiTelInput
                onChange={onChange}
                id={`${label}-input`}
                defaultCountry="AE"
                forceCallingCode
                focusOnSelectCountry
                onlyCountries={["AE", "SA", "EG"]}
                fullWidth
                size="small"
                {...fieldProps}
                value={value ?? ""}
                inputRef={register.ref}
                FormHelperTextProps={{
                  sx: FormHelperTextProps(fieldState.invalid, theme.direction),
                }}
                helperText={`${errors[ele]?.message}`}
                error={fieldState.invalid}
                disabled={disabled}
              />
            </Grid>
          )}
        />
      </Grid>
    </Grid>
  );
}

