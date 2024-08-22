import React from "react";
import { FormHelperText, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@emotion/react";
import { MuiTelInput } from "mui-tel-input";
import { Controller } from "react-hook-form";

function FormHelperTextProps(indicator, dir) {
  return {
    textAlign: `${dir == "ltr" ? "right" : "left"}`,
    color: "#fff !important",
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
const BootstrapInput = styled(InputBase)(({ theme, errors }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    fontFamily: "Tajawal",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    border: "1px solid",
    borderColor: errors ? "red" : "#E0E3E7",
    fontSize: 16,
    width: "100%",
    padding:'7px 15px',
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Tajawal"].join(","),
    "&:focus": {
      borderColor: errors ? "red" : theme.palette.primary.main,
    },
  },
}));

export default function InputField({
  register,
  ele,
  type,
  xs,
  md,
  label,
  multiline,
  errors,
  onChange,  // Add onChange prop to handle file changes
}) {
  const theme = useTheme();

  const handleFileChange = (event) => {
    if (onChange) onChange(event);  // Call onChange if provided
  };

  return (
    <Grid
      item
      xs={xs}
      md={md}
      sx={{ direction: `${theme.direction}`, padding: ".3rem 0" }}
    >
      <FormControl
        variant="standard"
        fullWidth
        sx={{ direction: `${theme.direction == "ltr" ? "rtl" : "ltr"}` }}
      >
        <InputLabel
          shrink
          htmlFor={`${label}-input`}
          sx={{
            fontFamily: "Tajawal",
            right: theme.direction == "ltr" ? " -10px !important" : "",
            left: theme.direction == "ltr" ? "unset" : " 0 !important",
          }}
        >
          {label}
        </InputLabel>
        <BootstrapInput
          defaultValue=""
          id={`${label}-input`}
          size="small"
          fullWidth
          type={type}
          {...register(ele, { onChange: type === "file" ? handleFileChange : undefined })}
          multiline={multiline}
          rows={4}
          errors={errors[ele]}
        />
        <FormHelperText sx={FormHelperTextProps(errors[ele], theme.direction)}>
          {errors[ele] ? errors[ele].message : " "}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
}

export function PhoneField({
  register,
  ele,
  type,
  xs,
  md,
  label,
  control,
  errors,
}) {
  const theme = useTheme();

  return (
    <Grid sx={{ width: "100%" }}>
      <Controller
        name={"Phone"}
        control={control}
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
            <InputLabel
              htmlFor={`${label}-input`}
              sx={{
                fontSize: ".8rem",
                paddingBottom: ".4rem",
                width: "100%",
                fontFamily: "Tajawal",
                right: theme.direction == "ltr" ? " 0 !important" : "",
                left: theme.direction == "ltr" ? "unset" : " 0 !important",
                direction: theme.direction == "ltr" ? "rtl" : "ltr",
              }}
            >
              {label}
            </InputLabel>
            <MuiTelInput
              onChange={onChange} // send value to hook form
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
              // inputRef={fieldRef}
              FormHelperTextProps={{
                sx: FormHelperTextProps(fieldState.invalid, theme.direction),
              }}
              helperText={`${errors[ele]?.message}`}
              error={fieldState.invalid}
              // {...register(ele)}
            />
          </Grid>
        )}
      />
    </Grid>
  );
}

