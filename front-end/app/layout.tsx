"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, colorMode] = useMode();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeContext.Provider value={colorMode}>
          <div className="app" style={{ display: "flex", height: "100vh" }}>
            <ThemeProvider theme={theme}>
              <Sidebar />
              <div style={{ flex: 1, overflowY: "auto" }}>
                <CssBaseline />
                {children}
              </div>
            </ThemeProvider>
          </div>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}
