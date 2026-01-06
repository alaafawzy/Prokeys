
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { useTheme } from "@emotion/react";
import { getAltText } from "../utils/getAltText";
import { useLangPrefix } from "../hooks/useLangPrefix";

export default function BlogCard({ id, title, description, image, created, english_alt, arabic_alt }) {
    const theme = useTheme();
    const prefix = useLangPrefix();
  return (
    <Card
      component={Link}
      to={`${prefix}/blog/${id}`}
      sx={{
        borderRadius: 3,
        m: 2,
        width: "100%",
        boxShadow: "none",
        border: "none",
        textDecoration: "none",
        color: "inherit",
        transition: "box-shadow 0.2s",
        cursor: "pointer",
        // borderTop: "4px solid #131F89",
        '&:hover': { boxShadow: 3 },
      }}
    >
      <Grid
        container
        direction={{ xs: "column", md: "row-reverse" }}
        alignItems={{ xs: "center", md: "stretch" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
          <CardMedia
            component="img"
            image={image}
            alt={getAltText({ english_alt, arabic_alt }, theme.direction === 'rtl', title)}
            sx={{
              width: { xs: 240, md: 240 },
              height: { xs: 200, md: 200 },
              objectFit: "cover",
              padding: { xs: 0, md: 2 },
              borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
              maxWidth: 240,
              minWidth: 180,
              mx: { xs: "auto", md: 0 },
            }}
          />
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md:  "flex-end" },
              height: "100%",
              textAlign: { xs: "center", md: "start" },
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontFamily: 'Cairo, sans-serif',
                color: '#131F89',
                fontSize: '1.5rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontFamily: 'Cairo, sans-serif',
                fontSize: '1rem',
              }}
            >
              {description}
            </Typography>
            {created && (
              <Typography variant="caption" color="text.secondary">
                {created}
              </Typography>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
