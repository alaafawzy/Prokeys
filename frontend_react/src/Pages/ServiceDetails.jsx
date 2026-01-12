import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import api from "../../Api"; // adjust path
import SectionsWithLeftImage from "../Sections/SectionWithLeftImage";
import SectionsWithRightImage from "../Sections/SectionWithRightImage";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { applyPageMetadata } from "../utils/metadataService";
import HowWeWork from "../Sections/HowWeWork";
import Feedback from "../Sections/Feedback";
export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/services/${id}/`);
        setService(response.data);
      } catch (error) {
        console.error("Failed to load service", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Apply metadata based on the service object and current language
  useEffect(() => {
    if (service) {
      applyPageMetadata(service);
    }

    return () => {
      document
        .querySelectorAll('meta[data-managed-by="prokeys"]')
        .forEach(tag => tag.remove());
    };
  }, [service, i18n.language]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!service) {
    return (
      <Typography align="center" sx={{ mt: 8 }}>
        Service not found
      </Typography>
    );
  }

  return (
    <>
    <Box sx={{ py: 8 }}>
      <Container>
        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1f2a7a",
            mb: 2,
            textAlign: "center",
          }}
        >
          {theme.direction === "rtl" ? service?.arabic_title : service?.english_title}
        </Typography>

       

        {/* Sections */}
        {service?.sections.map((section, index) => (
          index % 2 === 0 ? (
                    <SectionsWithRightImage key={index} data={section} />
                  ) : (
                    <SectionsWithLeftImage key={index} data={section} />
                  )
        ))}
      </Container>
    </Box>
    <HowWeWork />
    <Feedback />
    </>
  );
}
