import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import ReactCountryFlag from "react-country-flag";
import { useLocation, useNavigate } from "react-router-dom";

// const languages = [
//   { code: "ar", lang: "AR" },
//   { code: "en", lang: "EN" },
// ];
const languages = [
    { code: "en", country: "US", label: "English" },
    { code: "ar", country: "SA", label: "العربية" },
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

    // Update URL to include the new language prefix while preserving the rest of the path
    const segments = location.pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = targetLang;
    } else {
      // No language in URL yet; insert it after leading slash
      segments.splice(1, 0, targetLang);
    }
    const newPath = segments.join("/") || `/${targetLang}`;
    navigate(newPath, { replace: true });

    setOpen(false);
  };

  useEffect(() => {
    setThemeLang(i18n.dir());
  }, [i18n, i18n.language]);
const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];
  return (
    <div className="position-relative">
      {/* Trigger */}
      <button
        className="btn p-0 border-0"
        onClick={() => setOpen(prev => !prev)}
        style={{
          width: 40,
          height: 40,
          // background: "#006c35",
          
          // overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ReactCountryFlag
          countryCode={currentLanguage.country}
          svg
          style={{ fontSize: "28px" , height:"100%", width:"100%" ,borderRadius: "50%", }}
        />
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
              <ReactCountryFlag
                countryCode={lang.country}
                svg
                style={{ fontSize: "22px" }}
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};