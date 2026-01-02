// import { Box, Container, Grid } from "@mui/material";
import footer_logo from "../assets/footer_logo.png";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import api from '../../Api';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import NavButton from "../components/button";
import { Widgets, WidthFull } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();
  const Footer_text = t("Footer");
  const isRTL = theme.direction === 'rtl';
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await api.get('/footer/');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setFooterData(response.data[0]);
        } else if (response.data && !Array.isArray(response.data)) {
          setFooterData(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);
  const margin_icons= isRTL ?"ms-3":"me-3";
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
              {footerData?.youtube_url && (
                <a href={footerData.youtube_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <FaYoutube size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.facebook_url && (
                <a href={footerData.facebook_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <FaFacebook size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.twitter_url && (
                <a href={footerData.twitter_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <FaTwitter size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.instagram_url && (
                <a href={footerData.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <FaInstagram size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.linkedin_url && (
                <a href={footerData.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <FaLinkedin size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.whatsapp_url && (
                <a href={footerData.whatsapp_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <FaWhatsapp size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
            </div>
          </Col>
          {/* Contact */}
          <Col md={4} className="mb-3" dir={isRTL ? "ltr" : "rtl"}>
            <h6 className="footer-titles">{Footer_text.contactUs}</h6>
            <div className="mt-4 footer-text">
            <p>
               <a href={`mailto:${footerData?.email || 'info@111prokeys.com'}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                 {footerData?.email || 'info@111prokeys.com'}
               </a>
               <FaEnvelope className={margin_icons} style={{color:"#47C1CA"}}/>
            </p>
            <p>
               <a href={`tel:${footerData?.phone || '+971-507034621'}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                 {footerData?.phone || '+971-507034621'}
               </a>
               <FaPhone className={margin_icons} style={{color:"#47C1CA"}}/>
            </p>
            <p>
               {isRTL ? (footerData?.arabic_address || 'مكتب 43-44 الفهيدي') : (footerData?.english_address || 'Office 43-44 Al Fahidi')}
               <FaMapMarkerAlt className={margin_icons} style={{color:"#47C1CA"}}/>
            </p>
            </div>
          </Col>

          
        {/* Browse Website */}
          
        <Col md={3} className="mb-3">
            <h6 className="footer-titles">{Footer_text.browseWebsite}</h6>
            <ul className="list-unstyled mt-4 footer-text">
              <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.home}</Link></li>
              <li><Link to="/AboutUs" style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.aboutUs}</Link></li>
              <li><Link to="/Bundles" style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.packages}</Link></li>
              <li><Link to="/Services" style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.services}</Link></li>
              <li><Link to="/ContactUs" style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.contact}</Link></li>
              <li><Link to="/Blogs" style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.blogs}</Link></li>
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
