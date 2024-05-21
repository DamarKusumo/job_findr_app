"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PAGE_ROUTE_SEARCH_JOB } from "./search-job/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(PAGE_ROUTE_SEARCH_JOB);
  }, [router]);
}
