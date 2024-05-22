"use client";

import React from "react";
import { ConfigProvider, Spin } from "antd";
import theme from "@/theme/themeConfig";

const LoadingSpinner = () => {
  return (
    <ConfigProvider theme={theme}>
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    </ConfigProvider>
  );
};

export default LoadingSpinner;
