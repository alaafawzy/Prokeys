import "./App.css";
import { RouterProvider } from "react-router-dom";
import Routers from "./layout/routes";
import { Box, ThemeProvider } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider, useTheme } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import { useTranslation } from "react-i18next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPagePathsForLang, setPagePathOverrides } from "./config/pagePaths";
import { fetchPagePathsConfig } from "./utils/pagePathService";

function App() {
  const { theme1, setThemeLang } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const cacheRtl = createCache({
    key: "muirtl",

    stylisPlugins: [prefixer, stylisRTLPlugin],
  });

  // Keep <html> lang/dir attributes in sync with current language
  useEffect(() => {
    const lang = i18n.language === "en" ? "en" : "ar";
    document.documentElement.lang = lang;
    // document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  // Bump this whenever we successfully load new path overrides
  const [pathsVersion, setPathsVersion] = useState(0);

  // Load configurable page paths from backend once on mount
  useEffect(() => {
    let isMounted = true;

    const loadPagePaths = async () => {
      const config = await fetchPagePathsConfig();

      if (!isMounted || !Array.isArray(config) || config.length === 0) {
        return;
      }

      const overrides = { en: {}, ar: {} };

      config.forEach((item) => {
        if (!item || !item.key) return;

        if (item.english_path) {
          overrides.en[item.key] = item.english_path;
        }
        if (item.arabic_path) {
          overrides.ar[item.key] = item.arabic_path;
        }
      });

      setPagePathOverrides(overrides);
      setPathsVersion((v) => v + 1);
    };

    loadPagePaths();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentLang = i18n.language === "en" ? "en" : "ar";
  const paths = getPagePathsForLang(currentLang);
  const contactPath = paths.contact;

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme1}>
      
        {/* pathsVersion is only used to force re-creation of the router
          when backend overrides are applied. */}
        <RouterProvider router={Routers()} key={pathsVersion} />
        <Toaster
          toastOptions={{
            success: {
              iconTheme: {
                primary: "green",
                secondary: "white",
              },
              style: {
                background: "#5bb94e",
                color: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
              style: {
                background: "#b30101",
                color: "white",
              },
            },
          }}
        />
        <Box
          component={"a"}
          href={`/${currentLang}/${contactPath}`}
          sx={{
            position: "fixed",
            top: "50%",
            transform: "translateY(-50%)",
            right: theme1.direction == "rtl" ? "unset" : "20px",
            left: theme1.direction == "rtl" ? "20px" : "unset",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #5DD5E0 0%, #47C1CA 100%)",
            boxShadow: "0 0 0 15px rgba(77, 193, 202, 0.2), 0 4px 15px rgba(0, 0, 0, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "10px",
            transition: "all 0.3s ease",
            textDecoration: "none",
            zIndex: 1000,
            "&:hover": {
              transform: "translateY(-50%) scale(1.05)",
              boxShadow: "0 0 0 20px rgba(77, 193, 202, 0.25), 0 6px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Box
            sx={{
              color: "#fff",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "1.4",
            }}
          >
            {t("bookNow")}
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
