import React, { useState,useEffect ,useContext } from "react";
import { Box, Grid } from "@mui/material";
import InputField from "../components/InputField";
import LoginBackground from "../components/LoginBackground";
import FormFrame from "../components/FormFrame";
import { useTranslation } from "react-i18next";
import Btn from "../components/Btn";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import InputError from "../components/InputError";
import { LoginApi } from "../utils/Http";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import {logout} from "../../Api"
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const { user, loading,setUser } = useContext(UserContext);
  useEffect(() => {
    const handleLogout = async () => {
      const success = await logout();
      if (success) {
        setUser(null)
        navigate('/'); // Redirect to home page if logout is successful
      } else {
        console.error('Logout failed');
        // Handle the failure case if needed (e.g., show an error message)
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;