// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { save, read, update, readAll, deleteData } from "../../utils/firebaseSetting.js";

// 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method === "GET") {
        const { id } = req.query;
        if (id) {
            const doc = await read("jobs", id);
            if (doc)
                res.status(200).json({ status: 200, data:doc });
            else
                res.status(404).json({ status: 404, message: "Data not found" });
        } else {
            const docs = await readAll("jobs");
            res.status(200).json(docs);
        }
    }
    else if (req.method === "POST") {
        const { id, title, publicationDate, location, company, sourceSite, link } = req.body;
        const data = {
            title,
            publicationDate,
            location,
            company,
            sourceSite,
            link,
        };
        const doc = await save("jobs", id, data);
        res.status(200).json(doc);
    } else if (req.method === "PUT") {
        const { id } = req.query;
        const { title, publicationDate, location, company, sourceSite, link } = req.body;
        const data = {
            title,
            publicationDate,
            location,
            company,
            sourceSite,
            link,
        };
        const doc = await update("jobs", id, data);
        if (doc)
            res.status(200).json({ status: 200, data:doc });
        else
            res.status(404).json({ status: 404, message: "Data not found" });
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        const doc = await deleteData("jobs", id);
        if (doc)
            res.status(200).json({ status: 200, message: "Successfully deleted!" });
        else
            res.status(404).json({ status: 404, message: "Data not found" });
    }
}
