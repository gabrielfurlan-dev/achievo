import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    return res.status(201).json({
        message: "O servidor está ONLINE!",
        time: new Date().toISOString(),
    });
}
