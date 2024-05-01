// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { helloSelenium } from "@/scraper/test"

type Data = {
  name: string;
  status: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await helloSelenium();
  res.status(200).json({ name: "John Doe", status: data });
}
