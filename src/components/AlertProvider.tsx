"use client";

import { SnackbarProvider } from "notistack";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const AlertProvider: React.FC<Props> = ({ children }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      autoHideDuration={1000}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AlertProvider;
