import * as csv from "csv-parser";
import mongoose, { connect, Document, model, Schema } from "mongoose";
import axios from "axios";
import { Readable } from "stream";
import { formatMonthDate } from "../dateHelpers";
import { LastUpdated } from "@/utils/dateUtils";

// Define MongoDB document schema
interface IndexData extends Document {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Connect to MongoDB
// connect("mongodb://localhost:27017/nse_v1");

interface DbHelpers {
  saveLastUpdatedDate: (date: string) => Promise<void>;
  storeIndexDataFromURL: (
    url: string,
    allowedIndexNames: string[]
  ) => Promise<void>;
  storeStockDataFromURL: (
    url: string,
    allowedStockNames: string[]
  ) => Promise<void>;
  fetchDataFromDB: (
    allowedIndexNames: string[],
    dates: string[]
  ) => Promise<{ [indexName: string]: IndexData[] }>;
  fetchDailyDataFromDB: (
    allowedIndexNames: string[],
    offset: number
  ) => Promise<{ [indexName: string]: IndexData[] }>;
}

const IndexSchema = new Schema<IndexData>({
  symbol: String,
  date: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
});

const dbHelpers: DbHelpers = {
  saveLastUpdatedDate: async (date: string): Promise<void> => {
    try {
      // Update the existing document or create a new one if it doesn't exist
      await LastUpdated.findOneAndUpdate({}, { date }, { upsert: true });
      console.log("Last updated date saved successfully.");
    } catch (error) {
      console.error("Error saving last updated date:", error);
      throw error;
    }
  },

  storeIndexDataFromURL: async (
    url: string,
    allowedIndexNames: string[]
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get(url);
        for (const indexName of allowedIndexNames) {
          const IndexModel = model<IndexData>(indexName, IndexSchema);

          const existingData = await IndexModel.findOne({
            symbol: indexName,
          }).sort({
            date: -1,
          });

          // Create a readable stream from the response data
          const readableStream = Readable.from(response.data);

          readableStream
            .pipe(csv.default())
            .on("data", async (row: { [key: string]: string }) => {
              if (indexName !== row["Index Name"]) {
                return; // Skip rows not related to this index
              }

              const date = row["Index Date"];

              // Check if the date already exists for this index
              if (existingData && existingData.date === date) {
                console.log(
                  `Data for index ${indexName} on date ${date} already exists. Skipping...`
                );
                return;
              }

              const indexData: Partial<IndexData> = {
                symbol: indexName,
                date: date,
                open: parseFloat(row["Open Index Value"]),
                high: parseFloat(row["High Index Value"]),
                low: parseFloat(row["Low Index Value"]),
                close: parseFloat(row["Closing Index Value"]),
                volume: parseInt(row["Volume"]),
              };

              await IndexModel.create(indexData);
            })
            .on("end", () => {});
        }
        resolve(); // Resolve the promise when all data processing is done
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  },

  storeStockDataFromURL: async (
    url: string,
    allowedIndexNames: string[]
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get(url);

        for (const indexName of allowedIndexNames) {
          const IndexModel = model<IndexData>(indexName, IndexSchema);

          const existingData = await IndexModel.findOne({
            symbol: indexName,
          }).sort({
            date: -1,
          });

          // Create a readable stream from the response data
          const readableStream = Readable.from(response.data);

          readableStream
            .pipe(csv.default())
            .on("data", async (row: { [key: string]: string }) => {
              if (row[" SERIES"] !== " EQ") {
                return; // Skip rows not related to this index
              }

              if (indexName !== row["SYMBOL"]) {
                return; // Skip rows not related to this index
              }

              const date = formatMonthDate(row[" DATE1"].trim());

              // Check if the date already exists for this index
              if (existingData && existingData.date === date) {
                console.log(
                  `Data for index ${indexName} on date ${date} already exists. Skipping...`
                );
                return;
              }

              const indexData: Partial<IndexData> = {
                symbol: indexName,
                date: date,
                open: parseFloat(row[" OPEN_PRICE"]),
                high: parseFloat(row[" HIGH_PRICE"]),
                low: parseFloat(row[" LOW_PRICE"]),
                close: parseFloat(row[" LAST_PRICE"]),
                volume: parseInt(row[" TTL_TRD_QNTY"]),
              };

              await IndexModel.create(indexData);
            })
            .on("end", () => {});
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  fetchDataFromDB: async (
    allowedIndexNames: string[],
    dates: string[]
  ): Promise<{ [indexName: string]: IndexData[] }> => {
    const fetchedIndexData: { [indexName: string]: IndexData[] } = {};

    try {
      for (const indexName of allowedIndexNames) {
        // Define the IndexModel outside the loop
        const IndexModel = model<IndexData>(indexName, IndexSchema);

        // Query the database for index data based on symbol and date
        const indexData = await IndexModel.find({
          symbol: indexName,
          date: { $in: dates.map((date) => date) },
        });

        fetchedIndexData[indexName] = indexData;
      }

      return fetchedIndexData;
    } catch (error) {
      throw new Error(`Error fetching index data: ${error}`);
    }
  },

  fetchDailyDataFromDB: async (
    allowedIndexNames: string[],
    offset: number
  ): Promise<{ [indexName: string]: IndexData[] }> => {
    const fetchedIndexData: { [indexName: string]: IndexData[] } = {};

    try {
      console.log("Backend:", allowedIndexNames, offset);
      for (const indexName of allowedIndexNames) {
        // Define the IndexModel outside the loop
        const IndexModel = model<IndexData>(indexName, IndexSchema);

        // Query the database for index data based on symbol and date
        const indexData = await IndexModel.find({
          symbol: indexName,
        }).exec(); // Execute the query

        // Convert string dates to Date objects and sort
        const sortedDocs = indexData.sort((a, b) => {
          const dateA = new Date(
            a.date.split("-").reverse().join("-")
          ).getTime();
          const dateB = new Date(
            b.date.split("-").reverse().join("-")
          ).getTime();
          return dateA - dateB;
        });

        // Get the last two documents
        const lastTwoDocs = sortedDocs.slice(-2);

        fetchedIndexData[indexName] = lastTwoDocs;
      }
      return fetchedIndexData;
    } catch (error) {
      throw new Error(`Error fetching index data: ${error}`);
    }
  },
};

export const {
  saveLastUpdatedDate,
  storeIndexDataFromURL,
  storeStockDataFromURL,
  fetchDataFromDB,
  fetchDailyDataFromDB,
} = dbHelpers;
