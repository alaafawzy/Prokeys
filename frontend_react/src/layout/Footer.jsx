// import { Box, Container, Grid } from "@mui/material";
import logo from "../assets/logo.png";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import api from '../../Api'; // Import your Axios instance
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import NavButton from "../components/button";
import { Widgets, WidthFull } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Footer_text = t("Footer");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(Footer)
  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get('/footer/'); // Adjust endpoint as needed
  //       if (Array.isArray(response.data)) {
  //         setData(response.data);
  //       } else {
  //         // Set data to an empty array if the response is not an array
  //         setData([]);
  //       }
        
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  // const location=theme.direction=='rtl'?data[0]?.arabic_address:data[0]?.english_address
  // const phone=data[0]?.phone
  return (
    <div className="footer-section">
    <Container >
      <Row className="mb-5 align-items-center pt-5">
          <Col md={6} className="pt-3">
            
            <InputGroup>
            <NavButton className="px-3 py-3 mx-3 ">
                      {Footer_text.btn}
            </NavButton>
              <Form.Control
              className="rounded footer-email-input"
                placeholder={Footer_text.placeHolder}
                aria-label="Email"
              />
              <InputGroup.Text className="footer-email-icon">
                <FaEnvelope />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          {/* <Col md={6} className="pt-3">
                <div className="d-flex justify-content-end">
                  <p className="footer-logo-text"></p>
              <div className="footer-logo ">
            <Link  to={"/"}  >
                      <img src={logo} alt="Logo"  className="footer-brand" />
                    </Link>
                    </div>
                    </div>

          </Col> */}
        </Row>

        <hr className="footer-hr" />

        {/* Links and Contact */}
        <Row className="text-center text-md-end mb-4 pt-5 footer-contact">
          {/* Social Media */}
          <Col md={5} className="mb-3">
            <h6 className="footer-titles">تابعنا على وسائل التواصل التالية</h6>
            <div className="d-flex gap-3 justify-content-center justify-content-md-end mt-4 footer-text">
              <FaYoutube size={24} />
              <FaFacebook size={24} />
              <FaTwitter size={24} />
              <FaInstagram size={24} />
              <FaLinkedin size={24} />
            </div>
          </Col>
          {/* Contact */}
          <Col md={4} className="mb-3">
            <h6 className="footer-titles">تواصل معنا</h6>
            <div className="mt-4 footer-text">
            <p>
               info@111prokeys.com <FaEnvelope className="ms-3" />
            </p>
            <p>
               +971-507034621 <FaPhone className="ms-3"/>
            </p>
            <p>
               مكتب 43-44 الفهيدي<FaMapMarkerAlt className="ms-3"/>
            </p>
            </div>
          </Col>

          
        {/* Browse Website */}
          
        <Col md={3} className="mb-3">
            <h6 className="footer-titles">تصفح الموقع</h6>
            <ul className="list-unstyled mt-4 footer-text">
              <li>الرئيسية</li>
              <li>من نحن</li>
              <li>الباقات</li>
              <li>خدماتنا</li>
            </ul>
          </Col>

        </Row>

        <hr className="footer-hr" />

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center mt-4 mb-4">
            <small style={{color:"#FFFFFF"}}>111PRO.KEYS @ 2025. All rights reserved.</small>
          </Col>
        </Row>
    </Container>
    </div>
  );
}
