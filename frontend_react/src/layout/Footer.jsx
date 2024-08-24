import { Box, Container, Grid } from "@mui/material";
import logo from "../assets/newLogo.svg";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import api from '../../Api'; // Import your Axios instance
import { Link } from "react-router-dom";
export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Footer = t("Footer");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/footer/'); // Adjust endpoint as needed
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          // Set data to an empty array if the response is not an array
          setData([]);
        }
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const location=theme.direction=='rtl'?data[0]?.arabic_address:data[0]?.english_address
  const phone=data[0]?.phone
  return (
    <Container>
      <Grid
        container
        sx={{
          direction: `${theme.direction}`,
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "center", md: "space-between" },
          fontFamily: "Tajawal",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "16.8px",
          color: "#1A1A1A",
          "& > div": {
            display: "flex",
            flexDirection: "column",
            padding: "1rem 0",
          },
        }}
      >
        <Grid
          item
          xs={10}
          md={2}
          sx={{
            justifyContent: { xs: "center", md: "start" },
            alignItems: { xs: "center", md: "end" },
            order: { xs: "4", md: "1" },
            "& > div:not(:last-child)": {
              paddingBottom: "1rem",
            },
          }}
        >
          <Box>{Footer.follow}</Box>
          <Box
            component={"a"}
            href="https://www.linkedin.com/company/111-pro-keys"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
              height="25px"
            >
              <path
                fill="#0288D1"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
              />
              <path
                fill="#FFF"
                d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
              />
            </svg>
          </Box>
        </Grid>
        <Grid
          item
          xs={5}
          md={2}
          sx={{
            justifyContent: "start",
            alignItems: "end",
            order: { xs: "3", md: "1" },
            "& > div:not(:last-child)": {
              paddingBottom: "1rem",
            },
          }}
        >
          <Box>{Footer.communicate}</Box>
          <FooterLink value={"info@111prokeys.com"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3 12.23H17.82C16.84 12.23 15.97 12.77 15.53 13.65L14.69 15.31C14.49 15.71 14.09 15.96 13.65 15.96H10.37C10.06 15.96 9.62 15.89 9.33 15.31L8.49 13.66C8.05 12.79 7.17 12.24 6.2 12.24H2.7C2.31 12.24 2 12.55 2 12.94V16.2C2 19.83 4.18 22 7.82 22H16.2C19.63 22 21.74 20.12 22 16.78V12.93C22 12.55 21.69 12.23 21.3 12.23Z"
                fill="#828282"
              />
              <path
                d="M22 7.81V10.85C21.78 10.77 21.54 10.73 21.3 10.73H17.82C16.27 10.73 14.88 11.59 14.19 12.97L13.44 14.45H10.58L9.83 12.98C9.14 11.59 7.75 10.73 6.2 10.73H2.7C2.46 10.73 2.22 10.77 2 10.85V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81Z"
                fill="#828282"
              />
            </svg>
          </FooterLink>
          <FooterLink value={phone}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z"
                fill="#828282"
              />
              <path
                d="M21.9699 18.33C21.9699 18.61 21.9199 18.9 21.8199 19.18C21.7899 19.26 21.7599 19.34 21.7199 19.42C21.5499 19.78 21.3299 20.12 21.0399 20.44C20.5499 20.98 20.0099 21.37 19.3999 21.62C19.3899 21.62 19.3799 21.63 19.3699 21.63C18.7799 21.87 18.1399 22 17.4499 22C16.4299 22 15.3399 21.76 14.1899 21.27C13.0399 20.78 11.8899 20.12 10.7499 19.29C10.3599 19 9.96985 18.71 9.59985 18.4L12.8699 15.13C13.1499 15.34 13.3999 15.5 13.6099 15.61C13.6599 15.63 13.7199 15.66 13.7899 15.69C13.8699 15.72 13.9499 15.73 14.0399 15.73C14.2099 15.73 14.3399 15.67 14.4499 15.56L15.2099 14.81C15.4599 14.56 15.6999 14.37 15.9299 14.25C16.1599 14.11 16.3899 14.04 16.6399 14.04C16.8299 14.04 17.0299 14.08 17.2499 14.17C17.4699 14.26 17.6999 14.39 17.9499 14.56L21.2599 16.91C21.5199 17.09 21.6999 17.3 21.8099 17.55C21.9099 17.8 21.9699 18.05 21.9699 18.33Z"
                fill="#828282"
              />
            </svg>
          </FooterLink>
          {/* <FooterLink value={"+971-507034621"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.98 11.41C21.64 5.60995 16.37 1.13996 10.3 2.13996C6.12004 2.82996 2.77005 6.21994 2.12005 10.3999C1.74005 12.8199 2.24007 15.1099 3.33007 16.9999L2.44006 20.3099C2.24006 21.0599 2.93004 21.7399 3.67004 21.5299L6.93005 20.63C8.41005 21.5 10.14 21.9999 11.99 21.9999C17.63 21.9999 22.31 17.03 21.98 11.41ZM16.8801 15.7199C16.7901 15.8999 16.68 16.07 16.54 16.23C16.29 16.5 16.02 16.7 15.72 16.82C15.42 16.95 15.09 17.01 14.74 17.01C14.23 17.01 13.68 16.89 13.11 16.64C12.53 16.39 11.9601 16.0599 11.3901 15.6499C10.8101 15.2299 10.2701 14.7599 9.75005 14.2499C9.23005 13.7299 8.77003 13.1799 8.35003 12.6099C7.94003 12.0399 7.61005 11.4699 7.37005 10.8999C7.13005 10.3299 7.01006 9.77996 7.01006 9.25996C7.01006 8.91996 7.07006 8.58996 7.19006 8.28996C7.31006 7.97996 7.50007 7.69996 7.77007 7.44996C8.09007 7.12996 8.44005 6.97996 8.81005 6.97996C8.95005 6.97996 9.09002 7.00995 9.22002 7.06995C9.35002 7.12995 9.47005 7.21995 9.56005 7.34995L10.72 8.98994C10.81 9.11994 10.88 9.22994 10.92 9.33994C10.97 9.44994 10.99 9.54994 10.99 9.64994C10.99 9.76994 10.9501 9.88996 10.8801 10.01C10.8101 10.13 10.72 10.2499 10.6 10.3699L10.22 10.7699C10.16 10.8299 10.1401 10.8899 10.1401 10.9699C10.1401 11.0099 10.15 11.0499 10.16 11.0899C10.18 11.1299 10.1901 11.16 10.2001 11.1899C10.2901 11.36 10.45 11.5699 10.67 11.8299C10.9 12.0899 11.1401 12.3599 11.4001 12.6199C11.6701 12.8899 11.9301 13.1299 12.2001 13.3599C12.4601 13.5799 12.68 13.73 12.85 13.82C12.88 13.83 12.9101 13.8499 12.9401 13.8599C12.9801 13.8799 13.0201 13.88 13.0701 13.88C13.1601 13.88 13.2201 13.85 13.2801 13.79L13.66 13.41C13.79 13.28 13.9101 13.19 14.0201 13.13C14.1401 13.06 14.2501 13.0199 14.3801 13.0199C14.4801 13.0199 14.5801 13.0399 14.6901 13.0899C14.8001 13.1399 14.92 13.2 15.04 13.29L16.7001 14.4699C16.8301 14.5599 16.92 14.67 16.98 14.79C17.03 14.92 17.0601 15.0399 17.0601 15.1799C17.0001 15.3499 16.9601 15.5399 16.8801 15.7199Z"
                fill="#828282"
              />
            </svg>
          </FooterLink> */}
          <FooterLink value={location}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_40_23587)">
                <path
                  d="M20.6201 8.45C19.5701 3.83 15.5401 1.75 12.0001 1.75C12.0001 1.75 12.0001 1.75 11.9901 1.75C8.4601 1.75 4.4201 3.82 3.3701 8.44C2.2001 13.6 5.3601 17.97 8.2201 20.72C9.2801 21.74 10.6401 22.25 12.0001 22.25C13.3601 22.25 14.7201 21.74 15.7701 20.72C18.6301 17.97 21.7901 13.61 20.6201 8.45ZM12.0001 13.46C10.2601 13.46 8.8501 12.05 8.8501 10.31C8.8501 8.57 10.2601 7.16 12.0001 7.16C13.7401 7.16 15.1501 8.57 15.1501 10.31C15.1501 12.05 13.7401 13.46 12.0001 13.46Z"
                  fill="#828282"
                />
              </g>
              <defs>
                <clipPath id="clip0_40_23587">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </FooterLink>
        </Grid>
        <Grid
          item
          xs={5}
          md={2}
          sx={{
            justifyContent: "start",
            alignItems: "end",
            order: { xs: "3", md: "2" },
            "& > div:not(:last-child)": {
              paddingBottom: "1rem",
            },
          }}
        >
          <Box>{Footer.browse}</Box>
          <Box><Link to="/">{Footer.home}</Link></Box>
          <Box><Link to="/AboutUs">{Footer.who}</Link></Box>
          <Box><Link to="/Bundles">{Footer.bundles}</Link></Box>
          <Box><Link to="/OurServises">{Footer.services}</Link></Box>
        </Grid>
        <Grid
          item
          xs={10}
          md={3}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            order: { xs: "1", md: "3" },
          }}
        >
          <Link to="/"><img src={logo} width={"60%"}/></Link>
        </Grid>
      </Grid>
      <Grid
        sx={{
          width: "100%",
          borderTop: "1px solid #EAECF0",
          padding: "1rem 0",
          fontFamily: "Tajawal",
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "24px",
          color: "#131F89",
          textAlign: "center",
        }}
      >
        {Footer.rights}
      </Grid>
    </Container>
  );
}

function FooterLink({ children, value }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: theme.direction == "rtl" ? "left" : "right",
      }}
    >
      <Box sx={{ padding: "0 .5rem" }}>{value}</Box>
      <Box>{children}</Box>
    </Box>
  );
}
