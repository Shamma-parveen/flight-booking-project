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
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import validationText from "../../messages/validationText";
import { yupResolver } from "@hookform/resolvers/yup";
import generateRequestData from "@/utils/generateRequestData";
import { useMutation } from "react-query";
import login from "@/services/login";
import Alert from "@/utils/Alert";
import { useAppDispatch } from "@/store";
import { authActions } from "@/store/slices/authSlice";
import AuthRoute from "@/components/AuthRoute";
import RoutePaths from "@/config/routePaths";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(validationText.error.email_required)
    .email(validationText.error.email_format),

  password: yup.string().trim().required(validationText.error.enter_password),
});
interface FormField {
  email: string;
  password: string;
}
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { mutate: loginMutate, isLoading } = useMutation(login);
  const { control, handleSubmit } = useForm<FormField>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleAfterFormSubmit = (data: FormField) => {
    console.log(data);
    loginMutate(data, {
      onSuccess: (resData) => {
        if (resData.main_data.res_code === 200) {
          Alert.success(resData.main_data.response);
          dispatch(
            authActions.login({ token: resData.main_data.data.profile.token })
          );
        } else {
          Alert.error(resData.main_data.response);
        }
      },
    });
  };

  return (
    <Wrapper>
      <Container sx={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit(handleAfterFormSubmit)}>
          <Stack direction="column" gap={2}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }) => (
                <TextField
                  fullWidth
                  id="email"
                  value={value}
                  onChange={onChange}
                  error={invalid}
                  helperText={error?.message}
                />
              )}
            />
            <InputLabel htmlFor="password">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }) => (
                <TextField
                  fullWidth
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={value}
                  onChange={onChange}
                  error={invalid}
                  helperText={error?.message}
                  InputProps={{
                    endAdornment: (
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
                    ),
                  }}
                />
              )}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button variant="contained" type="submit" disabled={isLoading}>
                LOGIN
              </Button>
              <Typography>Forgot Password?</Typography>
            </Stack>
          </Stack>
        </form>
      </Container>
    </Wrapper>
  );
};

export default () => (
  <AuthRoute redirectUrl={RoutePaths.searchFlight()}>
    <LoginPage />
  </AuthRoute>
);
