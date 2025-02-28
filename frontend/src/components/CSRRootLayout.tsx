"use client";
import { SDKProvider } from "@tma.js/sdk-react";
import React from "react";

const CSRRootLayout = ({ children }: { children: React.ReactNode }) => {
  return <SDKProvider>{children}</SDKProvider>;
};

export default CSRRootLayout;
