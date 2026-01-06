import "./App.css";
import { RouterProvider } from "react-router-dom";
import Routers from "./layout/routes";
import { Box, ThemeProvider } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider, useTheme } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import { useTranslation } from "react-i18next";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { theme1, setThemeLang } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const cacheRtl = createCache({
    key: "muirtl",

    stylisPlugins: [prefixer, stylisRTLPlugin],
  });
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme1}>
      
        <RouterProvider router={Routers()} />
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
          href={`/${i18n.language === 'en' ? 'en' : 'ar'}/ContactUs`}
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
