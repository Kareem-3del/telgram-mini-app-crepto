"use client";
import "./globals.css";
import React from "react";

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

      <body className="overflow-x-hidden flex justify-center items-center h-[100vh]">
        <div
          id="root"
          className="w-full max-w-[400px] pt-[60px] bg-slate-800 h-[100vh] overflow-y-scroll"
        >
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
