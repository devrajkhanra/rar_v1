// import { Document } from "mongoose";

// interface IndexData extends Document {
//   symbol: string;
//   date: string;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
// }

// interface Utils {
//   filterMaxVolume: (indexData: { [indexName: string]: IndexData[] }) => {
//     [indexName: string]: IndexData;
//   };
// }

// const utils: Utils = {
//   filterMaxVolume: (indexData) => {
//     const filteredData: { [indexName: string]: IndexData } = {};

//     for (const indexName in indexData) {
//       const indexArray = indexData[indexName];
//       if (indexArray.length === 0) {
//         continue;
//       }

//       // Sort the index data array by volume in descending order
//       indexArray.sort((a, b) => b.volume - a.volume);

//       // Take the first element (max volume) after sorting
//       filteredData[indexName] = indexArray[0];
//     }

//     return filteredData;
//   },
// };

// export const { filterMaxVolume } = utils;

import { Document } from "mongoose";

interface IndexData extends Document {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Utils {
  filterMaxVolume: (indexData: {
    [indexName: string]: IndexData[];
  }) => IndexData[];
  calculateVolumeRatio: (
    array1: IndexData[],
    array2: IndexData[]
  ) => { [symbol: string]: number };
  filterClosePrice: (indexData: { [indexName: string]: IndexData[] }) => {
    [indexName: string]: number;
  };
  calculateChangePercentage: (
    closePrices1: { [indexName: string]: number },
    closePrices2: { [indexName: string]: number }
  ) => { [indexName: string]: number };
}

const utils: Utils = {
  filterMaxVolume: (indexData) => {
    const filteredData: IndexData[] = [];

    for (const indexName in indexData) {
      const indexArray = indexData[indexName];
      if (indexArray.length === 0) {
        continue;
      }

      // Sort the index data array by volume in descending order
      indexArray.sort((a, b) => b.volume - a.volume);

      // Take the first element (max volume) after sorting
      filteredData.push(indexArray[0]);
    }
    return filteredData;
  },
  calculateVolumeRatio: (
    array1: IndexData[],
    array2: IndexData[]
  ): { [symbol: string]: number } => {
    const volumeRatio: { [symbol: string]: number } = {};

    // Create a map of volumes for array1 for quick lookup
    const volumeMap: { [symbol: string]: number } = {};
    for (const item of array1) {
      volumeMap[item.symbol] = item.volume;
    }

    // Calculate volume ratio for common symbols
    for (const item of array2) {
      if (volumeMap[item.symbol] !== undefined) {
        volumeRatio[item.symbol] = item.volume / volumeMap[item.symbol];
      }
    }
    return volumeRatio;
  },
  filterClosePrice: (indexData) => {
    const filteredClosePrice: { [indexName: string]: number } = {};

    for (const indexName in indexData) {
      const indexArray = indexData[indexName];
      if (indexArray.length === 0) {
        continue;
      }

      // Get the last document (latest date) from the array
      const lastDocument = indexArray[indexArray.length - 1];

      // Extract the close price from the last document
      filteredClosePrice[indexName] = lastDocument.close;
    }

    return filteredClosePrice;
  },
  calculateChangePercentage: (closePrices1, closePrices2) => {
    const changePercentage: { [indexName: string]: number } = {};

    for (const indexName in closePrices1) {
      // Check if the index exists in both sets of close prices
      if (closePrices2.hasOwnProperty(indexName)) {
        const closePrice1 = closePrices1[indexName];
        const closePrice2 = closePrices2[indexName];

        // Calculate the change percentage
        const percentageChange =
          ((closePrice2 - closePrice1) / closePrice1) * 100;

        changePercentage[indexName] = percentageChange;
      }
    }

    return changePercentage;
  },
};

export const {
  filterMaxVolume,
  calculateVolumeRatio,
  filterClosePrice,
  calculateChangePercentage,
} = utils;
