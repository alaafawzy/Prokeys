// import { Box, Container, Grid } from "@mui/material";
import footer_logo from "../assets/footer_logo.png";
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
  const isRTL = theme.direction === 'rtl';
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
      <Row className={`mb-5 align-items-center pt-5 flex-column-reverse ${isRTL ? 'flex-md-row' : 'flex-md-row-reverse'}`}>
          <Col sx={12} md={8} className="pt-3">
            
            <InputGroup >
            <NavButton className="px-3 py-3 mx-2 " >
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
          <Col sx={12} md={4}  className={`pt-3 ${isRTL ? 'text-end' : 'text-start'} text-md-${isRTL ? 'end' : 'start'}`}>
            <img src={footer_logo} alt="111 Pro Keys Logo" style={{ height: '80px', width: 'auto' }} />
          </Col>
        </Row>

        <hr className="footer-hr" />

        {/* Links and Contact */}
        <Row className={`${isRTL ? 'text-end' : 'text-start'} text-md-${isRTL ? 'end' : 'start'} mb-4 pt-5 footer-contact flex-column-reverse ${isRTL ? 'flex-md-row' : 'flex-md-row-reverse'}`}>
          {/* Social Media */}
          <Col md={5} className="mb-3">
            <h6 className="footer-titles">{Footer_text.followUs}</h6>
            <div className={`d-flex gap-3 justify-content-${isRTL ? 'end' : 'start'} justify-content-md-${isRTL ? 'end' : 'start'} mt-4 footer-text fle`}>
              <FaYoutube size={24} />
              <FaFacebook size={24} />
              <FaTwitter size={24} />
              <FaInstagram size={24} />
              <FaLinkedin size={24} />
            </div>
          </Col>
          {/* Contact */}
          <Col md={4} className="mb-3">
            <h6 className="footer-titles">{Footer_text.contactUs}</h6>
            <div className="mt-4 footer-text">
            <p>
               info@111prokeys.com <FaEnvelope className="ms-3" style={{color:"#47C1CA"}}/>
            </p>
            <p>
               +971-507034621 <FaPhone className="ms-3" style={{color:"#47C1CA"}}/>
            </p>
            <p>
               مكتب 43-44 الفهيدي<FaMapMarkerAlt className="ms-3" style={{color:"#47C1CA"}}/>
            </p>
            </div>
          </Col>

          
        {/* Browse Website */}
          
        <Col md={3} className="mb-3">
            <h6 className="footer-titles">{Footer_text.browseWebsite}</h6>
            <ul className="list-unstyled mt-4 footer-text">
              <li>{Footer_text.home}</li>
              <li>{Footer_text.aboutUs}</li>
              <li>{Footer_text.packages}</li>
              <li>{Footer_text.services}</li>
            </ul>
          </Col>

        </Row>

        <hr className="footer-hr" />

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center mt-4 mb-4">
            <small style={{color:"#FFFFFF"}}>{Footer_text.copyright}</small>
          </Col>
        </Row>
    </Container>
    </div>
  );
}
