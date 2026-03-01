import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";

// const languages = [
//   { code: "ar", lang: "AR" },
//   { code: "en", lang: "EN" },
// ];
const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];
export default function Switcher({ xs }) {
  const theme = useTheme();
  const [Lang, setLang] = useState("en");
  const { setThemeLang } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (code) => {
    const targetLang = code === "en" || code === "ar" ? code : i18n.language === "en" ? "ar" : "en";

    // Update i18n
    i18n.changeLanguage(targetLang);
    setThemeLang(i18n.dir());

    // Always go to the home page of the selected language
    navigate(`/${targetLang}`, { replace: true });

    setOpen(false);
  };

  useEffect(() => {
    setThemeLang(i18n.dir());
  }, [i18n, i18n.language]);
  const currentLanguage =
    languages.find((l) => l.code === i18n.language) || languages[0];
  return (
    <div className="position-relative">
      {/* Trigger */}
      <button
        className="btn p-0 border-0"
        onClick={() => setOpen(prev => !prev)}
        style={{
          minWidth: 60,
          height: 32,
          padding: "0 8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 16,
          backgroundColor: "transparent",
          fontSize: 14,
        }}
      >
        <span>{currentLanguage.label}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="shadow position-absolute bg-white rounded p-2"
          style={{
            right: 0,
            marginTop: 8,
            zIndex: 1000,
            minWidth: 120
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="d-flex align-items-center gap-2 w-100 btn btn-light text-start mb-1"
            >
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};