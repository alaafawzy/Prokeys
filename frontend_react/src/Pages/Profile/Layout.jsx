import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const theme = useTheme();
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Grid
        sx={{
          display: "block",
          height: "130px",
          background: "linear-gradient(45deg, #A6C0FE 0%, #FFEAF6 100%)",
        }}
      />
      <Container
        sx={{
          transform: "translateY(-30px)",
        }}
      >
        <Grid
          container
          sx={{
            direction: `${theme.direction}`,
            display: "flex",
            flexFlow: "row-reverse wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={2.3}
            sx={{
              display: "flex",
              justifyContent: "end",
              paddingBottom: "1rem",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(45deg, #A6C0FE 0%, #FFEAF6 100%)",
                height: "10rem",
                width: "10rem",
                border: "4px solid #FFFFFF",
                borderRadius: "50%",
                boxShadow: "0px 4px 6px -2px #10182808",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {theme.direction}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={9.7}
            sx={{
              display: "flex",
              flexFlow: "column",
              alignItems: "end",
              fontFamily: "Tajawal",
              fontSize: "2rem",
              fontWeight: "500",
              lineHeight: "38px",
            }}
          >
            <Box>اسم الشركة</Box>
            <Box
              sx={{
                paddingTop: ".3rem",
                fontSize: "1.4rem",
              }}
            >
              اسم المستخدم
            </Box>
          </Grid>
        </Grid>
        <Tabs />
      </Container>
      <Container>
        <Outlet />
      </Container>
    </Grid>
  );
}
function Tabs() {
  const items = ["الصفحة الشخصية", "الملفات الاساسية", "الخدمات"];
  // const items = ["Profile", "files", "services"];
  const location = useLocation();
  const { pathname } = location;
  // to detect current tab
  let code = 0;
  pathname.split("/").length == 2
    ? (code = 0)
    : pathname.split("/")[2] == "Services"
    ? (code = 2)
    : (code = 1);

  const [currTab, setcurrTab] = useState(code);
  function changeTabs(tab) {
    setcurrTab(tab);
  }

  return (
    <Grid>
      <Navlink items={items} currTab={currTab} changeTabs={changeTabs} />
      <DropdownLink items={items} currTab={currTab} changeTabs={changeTabs} />
    </Grid>
  );
}

function Navlink({ items, currTab, changeTabs }) {
  const theme = useTheme();
  return (
    <Grid
      item
      md={12}
      container
      sx={{
        direction: `${theme.direction == "ltr" ? "rtl" : "ltr"}`,
        display: { xs: "none", md: "flex" },
        justifyContent: "start",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      {items?.map((item, index) => {
        return (
          <Navitem
            code={index}
            label={item}
            active={index == currTab}
            changeTabs={changeTabs}
            key={index}
          />
        );
      })}
    </Grid>
  );
}
function Navitem({ label, active, changeTabs, code }) {
  return (
    <Grid
      item
      xs={1.8}
      sx={{
        textAlign: "center",
        fontFamily: "Tajawal",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        color: active ? "#131F89" : "#828282",
        paddingBottom: ".5rem",
        borderBottom: active ? "2px solid #131F89" : "none",
      }}
    >
      <Link
        to={code == 0 ? "/Profile" : code == 1 ? "Services" : "Files"}
        style={{
          display: "inline-block",
          width: "100%",
          height: "100%",
        }}
        onClick={() => {
          changeTabs(code);
        }}
      >
        {label}
      </Link>
    </Grid>
  );
}
function DropdownLink({ items, currTab, changeTabs }) {
  const theme = useTheme();
  return (
    <Grid
      direction={"ltr"}
      sx={{ display: { xs: "block", md: "none" }, margin: "1rem 0" }}
    >
      <FormControl fullWidth>
        <Select
          value={currTab}
          onChange={(e) => {
            changeTabs(e.target.value);
          }}
          displayEmpty
          sx={{
            direction: `rtl`,
            "& > .MuiSelect-icon": {
              color: "red",
              direction: "ltr",
            },
          }}
        >
          {items.map((item, index) => {
            return (
              <MenuItem value={index} key={index} sx={{ direction: "ltr" }}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
}
