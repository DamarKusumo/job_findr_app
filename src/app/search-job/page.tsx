"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import CustomLayout from "@/components/layout/CustomLayout";
import { DataObject } from "./type";
import JobCard from "@/components/card/JobCard";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Pagination,
  Result,
  Select,
} from "antd";
import { useRouter } from "next/navigation";
import {
  BankOutlined,
  EnvironmentOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { getJobData } from "@/services/job";
import dayjs from "dayjs";

export const PAGE_ROUTE_SEARCH_JOB = "/search-job";
const dateFormat = "YYYY/MM/DD";

const SearchJobPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const position = searchParams["position"];
  const location = searchParams["location"];
  const company = searchParams["company"];
  const pubDate = searchParams["pubDate"];
  const currentPage = Number(searchParams["page"]);
  const pageSize = 60;

  const router = useRouter();

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [jobRes, setJobRes] = useState<any>();
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getParams = (
    position: any,
    location: any,
    company: any,
    pubDate: any,
    page?: number
  ) => {
    return `${position && position.length ? `position=${position}&` : ""}${
      location ? `location=${location}&` : ""
    }${company ? `company=${company}&` : ""}${
      pubDate ? `pubDate=${pubDate}&` : ""
    }${page ? `page=${page}&` : ""}`;
  };

  useEffect(() => {
    let params = getParams(position, location, company, pubDate, currentPage);
    fetchData(`${params}size=${pageSize}`);
  }, [position, pubDate, location, company, currentPage]);

  const fetchData = async (params: string) => {
    setIsFetching(true);
    try {
      const response = await getJobData(params);
      if (response.status === 200) {
        setJobRes(response.data);
      }
    } catch (error: any) {
      setErrorStatus(true);
      setErrorMessage(error.message.toString());
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) {
    return <LoadingSpinner />;
  }

  const onFinish = (values: any) => {
    const params = getParams(
      values.position,
      values.location,
      values.company,
      values.pubDate?.format(dateFormat)
    );
    router.push(`${PAGE_ROUTE_SEARCH_JOB}?${params}`);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed: ", errorInfo);
  };

  const customFormat: DatePickerProps["format"] = (value) =>
    value.format(dateFormat);

  return (
    <CustomLayout>
      <div className="fixed z-50 h-auto bg-white w-full px-5 md:px-10 flex items-center shadow-lg overflow-x-auto">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-auto pt-5 md:w-full flex md:grid md:grid-cols-9 gap-3"
          initialValues={{
            position: position ? (position as string).split(",") : null,
            location: location,
            company: company,
            pubDate: pubDate ? dayjs(`${pubDate}`, dateFormat) : null,
          }}
        >
          <Form.Item
            name="position"
            className="w-[150px] md:col-span-2 md:w-full"
          >
            <Select
              suffixIcon={<FilterOutlined />}
              mode="multiple"
              allowClear
              placeholder="Job types"
              options={[
                { value: "Programmer", label: "Programmer" },
                { value: "Data", label: "Data" },
                { value: "Network", label: "Network" },
                { value: "Cyber Security", label: "Cyber Security" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="location"
            className="w-[150px] md:col-span-2 md:w-full"
          >
            <Input
              suffix={
                <EnvironmentOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Location"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="company"
            className="w-[150px] md:col-span-2 md:w-full"
          >
            <Input
              suffix={<BankOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Company"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="pubDate"
            className="w-[150px] md:col-span-2 md:w-full"
          >
            <DatePicker
              placeholder="Published after"
              allowClear
              className="w-full"
              format={customFormat}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-fit md:w-full"
            >
              Filter
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-[56px] p-5 pt-10 sm:p-10 flex justify-center">
        {errorStatus && (
          <Result
            status="500"
            title="Sorry, something went wrong"
            subTitle={errorMessage}
          />
        )}
        {!errorStatus && (
          <div className="flex flex-col gap-10 items-center w-full">
            {jobRes?.data.length ? (
              <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {jobRes.data.map((job: DataObject, index: number) => (
                  <JobCard key={index} data={job} />
                ))}
              </div>
            ) : (
              <Result status="404" title="No jobs found" />
            )}

            {jobRes?.data.length ? (
              <Pagination
                defaultCurrent={1}
                current={currentPage ? currentPage : 1}
                total={jobRes.totalData}
                pageSize={pageSize}
                showSizeChanger={false}
                onChange={(page: number) => {
                  let params = getParams(
                    position,
                    location,
                    company,
                    pubDate,
                    page
                  );
                  router.push(`${PAGE_ROUTE_SEARCH_JOB}?${params}`);
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default SearchJobPage;
