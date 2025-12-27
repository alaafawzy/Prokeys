import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import api from "../../Api";
import { useTheme } from "@emotion/react";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/${id}/`);
        setBlog(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading blog.</Typography>;
  if (!blog) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 5, fontFamily: 'Cairo, sans-serif', color: '#131F89',textAlign: "center" }}>
        {theme.direction=='rtl'?blog?.arabic_title:blog?.english_title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <img
          src={blog.image}
          alt={blog.english_title}
          style={{ maxWidth: "100%", borderRadius: 16, maxHeight: 400, objectFit: "cover" }}
        />
      </Box>
      
      <Box sx={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', color: '#333',
        
        "& p, & div, & span, & li & ul & ol": {
        direction: theme.direction=='rtl'?'ltr':'rtl',
        },
    }}>
        <div dangerouslySetInnerHTML={{ __html: theme.direction=='rtl'?blog?.arabic_content:blog?.english_content }} />
      </Box>
    </Container>
  );
}
