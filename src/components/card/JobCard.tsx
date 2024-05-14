"use client";

import React from "react";
import { DataObject } from "@/app/search-job/type";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Row } from "antd";

interface JobCardProps {
  data: DataObject;
}

const JobCard = ({ data }: JobCardProps) => {
  return (
    <Card
      className="w-full"
      actions={[
        <a href={data.link} target="_blank">
          View Post
        </a>,
      ]}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
        <div className="w-[64px]">
          <Avatar shape="square" size={64} src={data.imageUrl} />
        </div>
        <div className="w-full flex flex-col">
          <span className="font-semibold text-lg line-clamp-2">
            {data.title}
          </span>
          <span className="font-medium line-clamp-2">{data.company}</span>
          <Row className="mt-3 gap-2">
            <EnvironmentOutlined className="opacity-50" />
            <span>{data.location}</span>
          </Row>
          <Row className="gap-2">
            <LinkOutlined className="opacity-50" />
            <span>{data.sourceSite}</span>
          </Row>
          <Row className="gap-2">
            <CalendarOutlined className="opacity-50" />
            <span>Published {data.publicationDate}</span>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
