"use client";
import { AppProvider } from "@/context/AppContext";
import "../globals.css";
import React from "react";
import dynamic from "next/dynamic";

// Load the client-side layout dynamically

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root" className="w-full">
          <AppProvider>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
