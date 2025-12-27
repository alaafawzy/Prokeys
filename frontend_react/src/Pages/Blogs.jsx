
import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";
import api from "../../Api";
import Connectwithus from "../Sections/Connectwithus";
import Feedback from "../Sections/Feedback";
import { useTheme } from "@emotion/react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blog/");
        setBlogs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Grid sx={{ margin: "2rem 0" }}>
      <Container>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: "center", color: '#131F89', fontFamily: 'Cairo, sans-serif' }}>
          {theme.direction === "rtl" ? "مدونة" : "Blogs"}
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error loading blogs.</Typography>}
        <Grid   direction="column">
          {blogs.map((blog) => (
            <Grid item key={blog.id} xs={12}sx={{
                borderTop: "1px solid #ccc", // change color/thickness as needed
                pb: 3 // optional: padding-top so content doesn't stick to border
              }}>
              <BlogCard
                id={blog.id}
                title={theme.direction === "rtl" ? blog.arabic_title : blog.english_title}
                description={theme.direction === "rtl" ? blog.arabic_description : blog.english_description}
                image={blog.image}
                created={blog.created_at || blog.created || blog.date}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* <Connectwithus /> */}
      {/* <Feedback /> */}
    </Grid>
  );
}
