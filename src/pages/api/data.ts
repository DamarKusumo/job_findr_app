// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { save, read, update, readAll, deleteData, getRef, filter } from "../../utils/firebaseSetting.js";
import { getCombinations } from "../../utils/utils.js"

// 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        if (req.method === "GET") {
            const { id, position, pubDate, location, company, page = 1, size = 20 } = req.query;
            if (id) {
                const doc = await read("jobs", id);
                if (doc)
                    res.status(200).json({ status: 200, data: doc, currentPage: 1, totalPages: 1, totalData: 1 });
                else
                    res.status(404).json({ status: 404, message: "Data not found" });
            } else {
                const data = await filter("jobs", position, pubDate, location, company, page, size);
                res.status(200).json({ status: 200, data: data[0], currentPage: parseInt(page as string), totalPages: data[2] , totalData: data[1] });
            }
        } else if (req.method === "POST") {
            const { id, title, publicationDate, location, company, sourceSite, linkDetail, position, logoImgLink } = req.body;
            const data = {
                title,
                titleIdx: getCombinations(title),
                publicationDate,
                location,
                locationIdx: getCombinations(location),
                company,
                companyIdx: getCombinations(company),
                sourceSite,
                linkDetail,
                position,
                logoImgLink,
            };
            const doc = await read("jobs", id as string);
            if (!doc) {
                const write = await save("jobs", id, data);
                res.status(200).json({ status: 200, data: write });
            } else {
                res.status(500).json({ status: 500, message: "Failed to save data, ID already exists" });
            }
        } else if (req.method === "PUT") {
            const { id } = req.query;
            const dataToUpdate = Object.fromEntries(
                Object.entries(req.body).filter(([key, value]) => value !== null)
            );
            const doc = await update("jobs", id, dataToUpdate);
            if (doc)
                res.status(200).json({ status: 200, data: doc });
            else
                res.status(404).json({ status: 404, message: "Data not found" });
        } else if (req.method === "DELETE") {
            const { id } = req.query;
            const doc = await deleteData("jobs", id);
            res.status(200).json({ status: 200, message: "Successfully deleted!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Failed to process request", error: error });
    }
}
