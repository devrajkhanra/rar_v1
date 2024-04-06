import { NextApiRequest, NextApiResponse } from "next";

import ParseCSVfromURL from "@/utils/csvUtils";

// Define your API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Simulate fetching an array of strings from a database or other data source
    const csvFile =
      "https://www.niftyindices.com/IndexConstituent/ind_niftymidcap50list.csv";
    const allowedStockNames = await ParseCSVfromURL(csvFile);

    // Return the array of strings as JSON
    res.status(200).json(allowedStockNames);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
