"use client";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "@/store";
import { authActions, authSelectors } from "@/store/slices/authSlice";
import { FlightDetailsContext } from "./FlightDetailsProvider";
const Header = () => {
  const { totalCartValue } = useContext(FlightDetailsContext);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flight Booking
          </Typography>
          {isAuthenticated && (
            <>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={totalCartValue} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </Box>
  );
};

export default Header;
