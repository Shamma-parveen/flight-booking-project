"use client";
import { Container, Wrapper } from "@/styles/styles";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Wrapper>
      <Container sx={{ maxWidth: "600px" }}>
        <form>
          <Stack direction="column" gap={2}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <TextField fullWidth id="email" />
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button variant="contained">LOGIN</Button>
              <Typography>Forgot Password?</Typography>
            </Stack>
          </Stack>
        </form>
      </Container>
    </Wrapper>
  );
};

export default LoginPage;
