import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import QueryProvider from "@/components/QueryProvider";
import AlertProvider from "@/components/AlertProvider";
import StoreProvider from "@/components/StoreProvider";
import AutoLoginProvider from "@/components/AutoLoginProvider";
import FlightDetailsProvider from "@/components/FlightDetailsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flight Booking",
  description: "Book Flights Easy And Quick",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <QueryProvider>
            <AlertProvider>
              <StoreProvider>
                <AutoLoginProvider>
                  <FlightDetailsProvider>
                    <Header />
                    {children}
                  </FlightDetailsProvider>
                </AutoLoginProvider>
              </StoreProvider>
            </AlertProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
