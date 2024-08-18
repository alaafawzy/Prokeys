import { createTheme } from "@mui/material";
import React, { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const ThemeContext = createContext(" ");

export default function ThemeContextProvider(props) {
  const { i18n } = useTranslation();
  console.log("first", i18n.dir());
  const [ThemeLang, setThemeLang] = useState(i18n.dir());

  const theme1 = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#2D8EFF",
      },
      success: {
        main: "#13CE66",
      },
      warning: {
        main: "#FFCC3D",
      },
      error: {
        main: "#FF4949",
      },
      black: {
        main: "#1A1A1A",
      },
      white: {},
    },
    dir: ThemeLang,
    direction: ThemeLang,
    font: "Tajawal",
    fontFamily: "Tajawal",
  });

  return (
    <ThemeContext.Provider value={{ theme1, setThemeLang }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
