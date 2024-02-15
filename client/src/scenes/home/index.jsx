import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Sidebar from "components/Sidebar";
import React, { useEffect, useState } from "react";
import { navItems } from "components/Sidebar";
import { ChevronRightOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

function Home() {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontWeight: "bold",
  };
  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center", mt: 5 }}>
        Welcome to the Home Page!
      </Typography>
      <FlexBetween>
        <Box>
          <Typography
            sx={{ fontWeight: "bold", mt: "5rem", ml: "5rem" }}
            variant="h6"
          >
            Note: Due to Errors in hosting platform the reload functionality
            will say 'Not Found' So you manually need to change the url to root
            directory
          </Typography>
        </Box>
      </FlexBetween>
      <List sx={{ display: "flex" }}>
        {navItems.map(({ text, icon }) => {
          if (!icon) {
            return (
              <Typography key={text} sx={{ margin: "2.5rem 0 1rem 3rem" }}>
                {text}
              </Typography>
            );
          }
          const lcText = text.toLocaleLowerCase();

          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/${lcText}`);
                  setActive(lcText);
                }}
                sx={{
                  backgroundColor:
                    active === lcText
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === lcText
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                    color:
                      active === lcText
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
                {active === lcText && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Home;
