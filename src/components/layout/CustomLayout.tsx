"use client";

import React from "react";
import theme from "@/theme/themeConfig";
import { ConfigProvider, Layout } from "antd";

const { Header, Content } = Layout;

const CustomLayout = ({ children }: any) => {
  return (
    <ConfigProvider theme={theme}>
      <Layout className="min-h-screen">
        <Header className="fixed top-0 z-50 w-full flex items-center">
          <a href="/search-job">
            <div className="text-white font-bold text-xl">JobFindr</div>
          </a>
        </Header>
        <Content className="mt-16">{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};

export default CustomLayout;
