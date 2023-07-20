"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from './Sidebar'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, colorMode] = useMode();
  return (
    <html lang="en">

      <body className={inter.className}>
        <ColorModeContext.Provider value={colorMode}>
          <div className='app'>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Sidebar />
            {children}
          </ThemeProvider>
          </div>
        </ColorModeContext.Provider>
      </body>

    </html>
  )
}
