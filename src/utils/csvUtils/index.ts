import * as fs from "fs";
import * as csv from "csv-parser";

interface Row {
  Symbol: string;
}

export default function readCSVAndExtractSymbols(
  csvFile: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const symbols: string[] = [];

    fs.createReadStream(csvFile)
      .pipe(csv.default())
      .on("data", (row: Row) => {
        symbols.push(row.Symbol);
      })
      .on("end", () => {
        resolve(symbols);
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
}

export const collectionNames: string[] = [];
const csvFile = "C://Users/Rar/Desktop/ind_niftymidcap50list.csv";
readCSVAndExtractSymbols(csvFile)
  .then(async (symbols: string[]) => {
    symbols.forEach((element) => {
      collectionNames.push(element);
    });
  })
  .catch((error: Error) => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Complete");
  });
