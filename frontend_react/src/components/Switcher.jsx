import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

const languages = [
  { code: "ar", lang: "AR" },
  { code: "en", lang: "EN" },
];

export default function Switcher({ xs }) {
  const theme = useTheme();
  const [Lang, setLang] = useState("en");
  const { setThemeLang } = useContext(ThemeContext);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language == "en" ? "ar" : "en");
    setThemeLang(i18n.dir());
  };

  const { i18n } = useTranslation();

  useEffect(() => {
    setThemeLang(i18n.dir());
  }, [i18n, i18n.language]);

  return (
    <>
      <Grid
        item
        xs={xs}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          width: "50px",
          margin: ".5rem 0",
          fontFamily: `${theme.fontFamily}`,
          fontSize: ".8rem",
          fontWeight: "700",
          "& > div": { width: "20px" },
        }}
        onClick={() => {
          changeLanguage();
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            border: "1px solid black",
            fontSize: "1rem",
            zIndex: "444",
            position: "relative",
            // color:"Blue"
          }}
        >
          {i18n.language == "ar" ? "EN" : "AR"}
        </Box>
        {/* <Grid
          sx={{
            zIndex: "333",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate( -41% , -50% )",
            width: "24px",
            height: "24px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.0001 3H9.0001C7.0501 8.84 7.0501 15.16 9.0001 21H8.0001"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 3C16.95 8.84 16.95 15.16 15 21"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Grid> */}
      </Grid>
      {/* {languages.map((Ing, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changeLanguage(Ing.code);
            }}
          >
            {Ing.lang}
          </button>
        );
      })} */}
    </>
  );
}
