
import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";
import api from "../../Api";
import Connectwithus from "../Sections/Connectwithus";
import Feedback from "../Sections/Feedback";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}>
          المدونة
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error loading blogs.</Typography>}
        <Grid container spacing={2} direction="column">
          {blogs.map((blog) => (
            <Grid item key={blog.id} xs={12}>
              <BlogCard
                id={blog.id}
                title={blog.english_title}
                description={blog.english_description}
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
