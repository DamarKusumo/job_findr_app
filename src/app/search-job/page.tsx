"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import CustomLayout from "@/components/layout/CustomLayout";
import { DataObject, JobResponse } from "./type";
import JobCard from "@/components/card/JobCard";
import { Pagination, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { dummyRes } from "./dummy";

const PAGE_ROUTE_SEARCH_JOB = "/search-job";

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
  const [jobRes, setJobRes] = useState<JobResponse>();
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    setJobRes(dummyRes);
    setIsFetching(false);
  }, [position, pubDate, location, company, currentPage]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <CustomLayout>
      <div className="fixed z-50 h-[56px] bg-white w-full px-5 sm:px-10 flex items-center shadow-lg">
        TODO Filter here
      </div>
      <div className="mt-[56px] p-5 sm:p-10 flex justify-center">
        {!errorStatus && (
          <div className="flex flex-col gap-10 items-center">
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
                  let params = `${position ? `position=${position}&` : ""}${
                    location ? `location=${location}&` : ""
                  }${company ? `company=${company}&` : ""}${
                    pubDate ? `pubDate=${pubDate}&` : ""
                  }`;
                  router.push(`${PAGE_ROUTE_SEARCH_JOB}?${params}page=${page}`);
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
