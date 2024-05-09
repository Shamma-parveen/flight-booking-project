import { useAppSelector } from "@/store";
import { authSelectors } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import FullPageLoader from "./FullPageLoader";
interface Props {
  children: React.ReactNode;
  redirectUrl: string;
}
const AuthRoute: FC<Props> = ({ children, redirectUrl }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectUrl);
    }
  }, [isAuthenticated]);
  return isAuthenticated ? <FullPageLoader /> : <>{children}</>;
};

export default AuthRoute;
