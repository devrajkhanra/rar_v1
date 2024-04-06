import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "./mongoose";
import { fetchDataFromDB } from "@/helpers/dbHelpers";
import { filterClosePrice, calculateChangePercentage } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collectionNames, dates1, dates2 } = req.body; // Assuming dates are sent in request body
  try {
    await connectDB();
    const result1 = await fetchDataFromDB(collectionNames, dates1);
    const result2 = await fetchDataFromDB(collectionNames, dates2);
    const chng1 = filterClosePrice(result1);
    const chng2 = filterClosePrice(result2);
    const cp = calculateChangePercentage(chng1, chng2);
    res.status(200).json(cp);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
