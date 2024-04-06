import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "./mongoose";

import readCSVAndExtractSymbols from "@/utils/csvUtils";

// Define your API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Simulate fetching an array of strings from a database or other data source
  const csvFile = "C://Users/Rar/Desktop/ind_nifty50list.csv";
  const allowedStockNames = await readCSVAndExtractSymbols(csvFile);

  // Return the array of strings as JSON
  res.status(200).json(allowedStockNames);
}
