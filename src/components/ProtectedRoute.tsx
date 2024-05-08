"use client";
import RoutePaths from "@/config/routePaths";
import { useAppSelector } from "@/store";
import { authSelectors } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
interface Props {
  children: React.ReactNode;
}
const ProtectedRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(RoutePaths.login());
    }
  }, [isAuthenticated]);
  return isAuthenticated ? <>{children}</> : <div>Loading...</div>;
};

export default ProtectedRoute;
