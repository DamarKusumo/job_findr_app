"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import CustomLayout from "@/components/layout/CustomLayout";
import { DataObject } from "./type";
import JobCard from "@/components/card/JobCard";
import { Pagination, Result } from "antd";
import { dummy } from "./dummy";

const SearchJobPage = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [jobData, setJobData] = useState<DataObject[]>(dummy);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(false);
  }, []);

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
            {jobData.length ? (
              <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {jobData.map((job: DataObject, index: number) => (
                  <JobCard key={index} data={job} />
                ))}
              </div>
            ) : (
              <Result
                status="404"
                title="No matching jobs found."
                subTitle="Try rephrasing your search."
              />
            )}

            {/* {jobData.length ? (
              <Pagination
                defaultCurrent={1}
                total={jobData.length}
                pageSize={15}
              />
            ) : null} */}
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default SearchJobPage;
