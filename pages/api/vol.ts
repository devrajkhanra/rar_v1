import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "./mongoose";
import { fetchDataFromDB } from "@/helpers/dbHelpers";
import { filterMaxVolume, calculateVolumeRatio } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collectionNames, dates1, dates2 } = req.body; // Assuming dates are sent in request body
  try {
    await connectDB();
    const result1 = await fetchDataFromDB(collectionNames, dates1);
    const result2 = await fetchDataFromDB(collectionNames, dates2);
    const maxV1 = filterMaxVolume(result1);
    const maxV2 = filterMaxVolume(result2);
    const vr = calculateVolumeRatio(maxV1, maxV2);
    res.status(200).json(vr);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
