"use client";

import React from "react";
import { DataObject } from "@/app/search-job/type";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";

interface JobCardProps {
  data: DataObject;
}

const JobCard = ({ data }: JobCardProps) => {
  return (
    <Card
      className="w-full"
      actions={[
        <a href={data.linkDetail} target="_blank">
          View Post
        </a>,
      ]}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
        <div className="w-[64px]">
          <Avatar shape="square" size={64} src={data.logoImgLink} />
        </div>
        <div className="w-full flex flex-col">
          <span className="font-semibold text-lg line-clamp-2">
            {data.title}
          </span>
          <span className="font-medium line-clamp-2">{data.company}</span>
          <Row className="mt-3 ">
            <Col flex="1" className="h-auto">
              <EnvironmentOutlined className="opacity-50" />
            </Col>
            <Col flex="9" className="h-auto">
              <span className="break-words">{data.location}</span>
            </Col>
          </Row>
          <Row>
            <Col flex="1" className="h-auto">
              <LinkOutlined className="opacity-50" />
            </Col>
            <Col flex="9" className="h-auto">
              <span className="break-words">{data.sourceSite}</span>
            </Col>
          </Row>
          <Row>
            <Col flex="1" className="h-auto">
              <CalendarOutlined className="opacity-50" />
            </Col>
            <Col flex="9" className="h-auto">
              <span className="break-words">
                Published {data.publicationDate}
              </span>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
