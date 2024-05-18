import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const baseUrl = `${process.env.API_SCRAP_URL}/api/hit`;
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const source = ['karir', 'jobstreet', 'kalibrr', 'linkedin']
    for (const s of source) {
        let i = 3;
        while (i > 0) {
            const data = await axios.get(`${baseUrl}?source=${s}`);
            if (data.data.status == 200) {
                i = 0;
            }
            i--;
        }
        
    }
    res.status(200).json({ status: 200, message: "Cron job is running" });
}