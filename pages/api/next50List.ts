// import { NextApiRequest, NextApiResponse } from "next";
// import { connectDB } from "./mongoose";

// import ParseCSVfromURL from "@/utils/csvUtils";

// // Define your API handler function
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await connectDB();
//   // Simulate fetching an array of strings from a database or other data source
//   const csvFile =
//     "https://www.niftyindices.com/IndexConstituent/ind_niftynext50list.csv";
//   const allowedStockNames = await ParseCSVfromURL(csvFile);

//   // Return the array of strings as JSON
//   res.status(200).json(allowedStockNames);
// }

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "./mongoose";
import ParseCSVfromURL from "@/utils/csvUtils";

interface Cache {
  csvData?: any; // Define the shape of the cache object
}

// Define a cache object to store results
let cache: Cache = {};

// Define your API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  // Check if the result is already cached
  if (cache.csvData) {
    // Return cached data
    console.log("Next 50 Cached");
    res.status(200).json(cache.csvData);
    return;
  }

  // If not cached, fetch the data and store it in the cache
  console.log("Next 50 not cached");
  const csvFile =
    "https://www.niftyindices.com/IndexConstituent/ind_niftynext50list.csv";
  const allowedStockNames = await ParseCSVfromURL(csvFile);
  cache.csvData = allowedStockNames;

  // Return the data
  res.status(200).json(allowedStockNames);
}
