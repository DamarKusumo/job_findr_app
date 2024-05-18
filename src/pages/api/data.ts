// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { save, read, update, readAll, deleteData } from "../../utils/firebaseSetting.js";

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
                const docs = await readAll("jobs");
                let data = [];
                data = docs.filter((doc) =>
                    (!position || doc.position.toLowerCase() === (position as string)?.toLowerCase()) &&
                    (!pubDate || new Date(doc.publicationDate).getTime() >= new Date(pubDate as string).getTime()) &&
                    (!location || doc.location.toLowerCase() === (location as string)?.toLowerCase()) &&
                    (!company || doc.company.toLowerCase() === (company as string)?.toLowerCase())
                );

                const lenData = data.length;
                let totalPages = 1;
                if (parseInt(size as string) < lenData) totalPages = Math.ceil(lenData / parseInt(size as string));
                if (parseInt(page as string) > totalPages) return res.status(404).json({ status: 404, message: "Page not found" });
                const resData = data.slice((parseInt(page as string) - 1) * parseInt(size as string), parseInt(page as string) * parseInt(size as string));
                res.status(200).json({ status: 200, data: resData, currentPage: parseInt(page as string), totalPages: totalPages, totalData: lenData });
            }
        } else if (req.method === "POST") {
            const { id, title, publicationDate, location, company, sourceSite, linkDetail, position, logoImgLink } = req.body;
            const data = {
                title,
                publicationDate,
                location,
                company,
                sourceSite,
                linkDetail,
                position,
                logoImgLink
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
