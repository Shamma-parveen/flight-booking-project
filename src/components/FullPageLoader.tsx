import styled from "@emotion/styled";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
const FullWrapper = styled(Box)`
  position: fixed;
  inset: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FullPageLoader = () => {
  return (
    <FullWrapper>
      <CircularProgress />
    </FullWrapper>
  );
};

export default FullPageLoader;
