import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "./mongoose";
import { fetchDailyDataFromDB } from "@/helpers/dbHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collectionNames, offset } = req.body; // Assuming dates are sent in request body
  try {
    await connectDB();
    const result1 = await fetchDailyDataFromDB(collectionNames, offset);
    res.status(200).json(result1);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
