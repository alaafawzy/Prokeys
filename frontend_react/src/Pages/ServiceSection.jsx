import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import api from "../../Api"; // adjust path
import { useTheme } from "@emotion/react";
import { useLangPrefix } from "../hooks/useLangPrefix";
import { useTranslation } from "react-i18next";
import { getPagePathsForLang } from "../config/pagePaths";
import { Link as RouterLink } from "react-router-dom";

const iconMap = {
  storage: <StorageOutlinedIcon />,
  psychology: <PsychologyOutlinedIcon />,
  task: <TaskAltOutlinedIcon />,
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const prefix = useLangPrefix();
  const { i18n } = useTranslation();
  const paths = getPagePathsForLang(i18n.language);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services/services/"); // Adjust endpoint as needed
        setServices(response.data);
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f7f8fc", py: 8 }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#1f2a7a", mb: 6 }}
        >
          {theme.direction === "rtl" ? "خدماتنا" : "Our Services"}
        </Typography>

        <Grid container spacing={4} sx={{ direction: theme.direction==='rtl'?'ltr':'rtl'  }}>
          {services.map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: `linear-gradient(
                    180deg,
                    ${alpha("#27307F", 0.08)} 0%,
                    ${alpha("#27307F", 0.18)} 100%
                  )`,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent sx={{ direction: "rtl" }}>
                  {/* Icon + Title */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                      flexDirection: theme.direction === "rtl" ? "row" : "row-reverse",
                    }}
                  >
                    <Box sx={{ color: "#27307F", fontSize: 30 }}>
                      {iconMap[service.icon] || <StorageOutlinedIcon />}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#1f2a7a",
                        textAlign: "end",
                      }}
                    >
                      {theme.direction === "rtl" ? service.arabic_title : service.english_title}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      lineHeight: 1.8,
                      mb: 2,
                      textAlign: theme.direction === "rtl" ? "end" : "start",
                    }}
                  >
                    {theme.direction === "rtl" ? service.arabic_description : service.english_description}
                  </Typography>

                  <Box
                    component={RouterLink}
                    to={`${prefix}/${paths.serviceDetails.replace(
                      ":slug",
                      i18n.language === "en"
                        ? service.english_slug
                        : service.arabic_slug
                    )}`}
                    sx={{
                      color: "#27307F",
                      fontWeight: "bold",
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    {theme.direction === "rtl"
                      ? ` \u2190  استكشف المزيد `  // ← arrow after Arabic
                      : `Explore More \u2192`}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
