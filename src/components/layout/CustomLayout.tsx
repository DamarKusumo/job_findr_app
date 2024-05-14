"use client";

import React from "react";
import theme from "@/theme/themeConfig";
import { ConfigProvider, Layout } from "antd";

const { Header, Content } = Layout;

const CustomLayout = ({ children }: any) => {
  return (
    <ConfigProvider theme={theme}>
      <Layout className="min-h-screen">
        <Header className="sticky top-0 z-50 w-full flex items-center">
          <div className="text-white font-bold text-xl">JobFindr</div>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};

export default CustomLayout;
