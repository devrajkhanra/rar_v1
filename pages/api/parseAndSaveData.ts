// pages/api/parseAndSaveData.ts

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../api/mongoose";
import {
  saveLastUpdatedDate,
  storeIndexDataFromURL,
  storeStockDataFromURL,
} from "@/helpers/dbHelpers";

import readCSVAndExtractSymbols from "@/utils/csvUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // interface Row {
  //   Symbol: string;
  // }

  // function readCSVAndExtractSymbols(csvFile: string): Promise<string[]> {
  //   return new Promise((resolve, reject) => {
  //     const symbols: string[] = [];

  //     fs.createReadStream(csvFile)
  //       .pipe(csv.default())
  //       .on("data", (row: Row) => {
  //         symbols.push(row.Symbol);
  //       })
  //       .on("end", () => {
  //         resolve(symbols);
  //       })
  //       .on("error", (error: Error) => {
  //         reject(error);
  //       });
  //   });
  // }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { dateStr } = req.body; // Assuming the request body contains the URL of the CSV

    await connectDB(); // Connect to MongoDB before calling parseAndSaveData
    const allowedIndexNames = [
      "Nifty 50",
      "Nifty Next 50",
      "Nifty Midcap 50",
      "Nifty Auto",
      "Nifty Bank",
      "Nifty Commodities",
      "Nifty Consumer Durables",
      "Nifty CPSE",
      "Nifty Energy",
      "Nifty Financial Services",
      "Nifty FMCG",
      "Nifty Healthcare Index",
      "Nifty IT",
      "Nifty India Consumption",
      "Nifty Infrastructure",
      "Nifty Media",
      "Nifty Metal",
      "Nifty MNC",
      "Nifty Oil & Gas",
      "Nifty Pharma",
      "Nifty PSU Bank",
      "Nifty PSE",
      "Nifty Private Bank",
      "Nifty Realty",
      "Nifty Services Sector",
    ];
    const csvFile = "C://Users/Rar/Desktop/ind_nifty200list.csv";
    const allowedStockNames = await readCSVAndExtractSymbols(csvFile);

    const urlIndex = `https://archives.nseindia.com/content/indices/ind_close_all_${dateStr}.csv`;
    await storeIndexDataFromURL(urlIndex, allowedIndexNames); // Parse and save data from CSV

    const urlStock = `https://archives.nseindia.com/products/content/sec_bhavdata_full_${dateStr}.csv`;
    await storeStockDataFromURL(urlStock, allowedStockNames);

    await saveLastUpdatedDate(dateStr);

    return res
      .status(200)
      .json({ message: "Data parsed and saved successfully" });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
