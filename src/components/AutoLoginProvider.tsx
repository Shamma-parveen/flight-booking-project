"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { authActions, authSelectors } from "@/store/slices/authSlice";
import AuthTokenData from "@/utils/AuthTokenData";
import React, { FC, useEffect } from "react";
import FullPageLoader from "./FullPageLoader";
interface Props {
  children: React.ReactNode;
}
const AutoLoginProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isInitilized = useAppSelector(authSelectors.isInitilized);
  useEffect(() => {
    const token = AuthTokenData.get();
    if (token) {
      dispatch(authActions.login({ token }));
    } else {
      dispatch(authActions.logout());
    }
  }, []);
  return isInitilized ? <>{children}</> : <FullPageLoader />;
};

export default AutoLoginProvider;
