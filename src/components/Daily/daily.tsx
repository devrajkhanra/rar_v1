// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// interface IndexData {
//     symbol: string;
//     date: string;
//     open: number;
//     high: number;
//     low: number;
//     close: number;
//     volume: number;
// }

// interface DailyProps {
//     apiListName: string;
//     [key: string]: any;
// }

// const Daily: React.FC<DailyProps> = ({ apiListName }) => {
//     const [tableData, setTableData] = useState<{ indexName: string, volumeRatio: number, changePercentage: number }[]>([]);
//     const [sortColumn, setSortColumn] = useState<string>('volumeRatio');
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     useEffect(() => {
//         const abortController1 = new AbortController();
//         const signal1 = abortController1.signal;

//         const fetchDaily = async (collectionNames: string[], offset: number, signal: AbortSignal) => {
//             try {
//                 const response = await axios.post(`/api/fetchWB`, {
//                     collectionNames,
//                     offset
//                 }, { signal });
//                 return response.data;
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 throw error;
//             }
//         };

//         const calculateVolumeDifferenceAndChangePercentage = (data: { [indexName: string]: IndexData[] }) => {
//             const newData: { indexName: string, volumeRatio: number, changePercentage: number }[] = [];

//             Object.keys(data).forEach(indexName => {
//                 const indexData = data[indexName];
//                 if (indexData.length >= 2) {
//                     const latestVolume = indexData[0].volume;
//                     const previousVolume = indexData[1].volume;
//                     const latestClose = indexData[0].close
//                     const previousClose = indexData[1].close;
//                     const volumeRatio = latestVolume / previousVolume;
//                     const changePercentage = ((latestClose - previousClose) / previousClose) * 100;
//                     newData.push({ indexName, volumeRatio, changePercentage });
//                 }
//             });

//             return newData;
//         };

//         const fetchList = async () => {
//             const offset = 0;
//             try {
//                 let collectionNames: string[] = [];
//                 if (apiListName !== 'index') {
//                     const collectionNamesResponse = await axios.get(`/api/nifty50List`);
//                     collectionNames = collectionNamesResponse.data;
//                 } else {
//                     collectionNames = [
//                         "Nifty 50",
//                         "Nifty Next 50",
//                         "Nifty Midcap 50",
//                         "Nifty Auto",
//                         "Nifty Bank",
//                         "Nifty Commodities",
//                         "Nifty Consumer Durables",
//                         "Nifty CPSE",
//                         "Nifty Energy",
//                         "Nifty Financial Services",
//                         "Nifty FMCG",
//                         "Nifty Healthcare Index",
//                         "Nifty IT",
//                         "Nifty India Consumption",
//                         "Nifty Infrastructure",
//                         "Nifty Media",
//                         "Nifty Metal",
//                         "Nifty MNC",
//                         "Nifty Oil & Gas",
//                         "Nifty Pharma",
//                         "Nifty PSU Bank",
//                         "Nifty PSE",
//                         "Nifty Private Bank",
//                         "Nifty Realty",
//                         "Nifty Services Sector",

//                     ];
//                 }

//                 const response = await fetchDaily(collectionNames, offset, signal1);
//                 const calculatedData = calculateVolumeDifferenceAndChangePercentage(response);
//                 setTableData(calculatedData);
//             } catch (error) {
//                 console.error('Error fetching volume ratios:', error);
//             }
//         };

//         fetchList();
//         return () => {
//             abortController1.abort();
//         };
//     }, [apiListName]);

//     const handleSort = (column: string) => {
//         if (sortColumn === column) {
//             // Toggle sorting direction if same column is clicked again
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             // Set sorting column and default to ascending direction
//             setSortColumn(column);
//             setSortDirection('asc');
//         }
//     };

//     // Sort tableData based on sortColumn and sortDirection
//     const sortedData = tableData.sort((a, b) => {
//         const aValue = a.volumeRatio as number;
//         const bValue = b.volumeRatio as number;
//         if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
//         if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
//         return 0;
//     });

//     return (
//         <div className="overflow-x-auto p-3">
//             <table className="min-w-full bg-transparent shadow-md rounded-lg overflow-hidden">
//                 <thead className="bg-gray-800 text-white">
//                     <tr>
//                         <th className="text-left py-2 px-3 uppercase font-semibold text-sm">Symbol</th>
//                         <th className="text-left py-2 px-3 uppercase font-semibold text-sm">
//                             VR
//                             <button onClick={() => handleSort('volumeRatio')}>
//                                 {sortColumn === 'volumeRatio' && sortDirection === 'asc' && '▲'}
//                                 {sortColumn === 'volumeRatio' && sortDirection === 'desc' && '▼'}
//                             </button>
//                         </th>
//                         <th className="text-left px-3 uppercase font-semibold text-sm">Change %</th>
//                     </tr>
//                 </thead>
//                 <tbody className="text-gray-700">
//                     {sortedData.map((data, index) => (
//                         <tr key={index} className="border-b border-gray-200">
//                             <td className="text-left py-3 px-4">{data.indexName}</td>
//                             <td className="text-left py-3 px-4">{data.volumeRatio.toFixed(2)}</td>
//                             <td className="text-left py-3 px-4">{data.changePercentage.toFixed(2)}%</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Daily;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Button } from '../ui/button';
// import { ArrowDownUp } from 'lucide-react';

// interface IndexData {
//     symbol: string;
//     date: string;
//     open: number;
//     high: number;
//     low: number;
//     close: number;
//     volume: number;
// }

// interface DailyProps {
//     apiListName: string;
//     [key: string]: any;
// }

// const Daily: React.FC<DailyProps> = ({ apiListName }) => {
//     const [tableData, setTableData] = useState<{ indexName: string, volumeRatio: number, changePercentage: number }[]>([]);
//     const [sortColumn, setSortColumn] = useState<string>('volumeRatio');
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     useEffect(() => {
//         const abortController1 = new AbortController();
//         const signal1 = abortController1.signal;

//         const fetchDaily = async (collectionNames: string[], offset: number, signal: AbortSignal) => {
//             try {
//                 const response = await axios.post(`/api/fetchWB`, {
//                     collectionNames,
//                     offset
//                 }, { signal });
//                 return response.data;
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 throw error;
//             }
//         };

//         const calculateVolumeDifferenceAndChangePercentage = (data: { [indexName: string]: IndexData[] }) => {
//             const newData: { indexName: string, volumeRatio: number, changePercentage: number }[] = [];

//             Object.keys(data).forEach(indexName => {
//                 const indexData = data[indexName];
//                 if (indexData.length >= 2) {
//                     const latestVolume = indexData[0].volume;
//                     const previousVolume = indexData[1].volume;
//                     const latestClose = indexData[0].close
//                     const previousClose = indexData[1].close;
//                     const volumeRatio = latestVolume / previousVolume;
//                     const changePercentage = ((latestClose - previousClose) / previousClose) * 100;
//                     newData.push({ indexName, volumeRatio, changePercentage });
//                 }
//             });

//             return newData;
//         };

//         const fetchList = async () => {
//             const offset = 0;
//             try {
//                 let collectionNames: string[] = [];
//                 if (apiListName !== 'index') {
//                     const collectionNamesResponse = await axios.get(`/api/nifty50List`);
//                     collectionNames = collectionNamesResponse.data;
//                 } else {
//                     collectionNames = [
//                         "Nifty 50",
//                         "Nifty Next 50",
//                         "Nifty Midcap 50",
//                         "Nifty Auto",
//                         "Nifty Bank",
//                         "Nifty Commodities",
//                         "Nifty Consumer Durables",
//                         "Nifty CPSE",
//                         "Nifty Energy",
//                         "Nifty Financial Services",
//                         "Nifty FMCG",
//                         "Nifty Healthcare Index",
//                         "Nifty IT",
//                         "Nifty India Consumption",
//                         "Nifty Infrastructure",
//                         "Nifty Media",
//                         "Nifty Metal",
//                         "Nifty MNC",
//                         "Nifty Oil & Gas",
//                         "Nifty Pharma",
//                         "Nifty PSU Bank",
//                         "Nifty PSE",
//                         "Nifty Private Bank",
//                         "Nifty Realty",
//                         "Nifty Services Sector",

//                     ];
//                 }

//                 const response = await fetchDaily(collectionNames, offset, signal1);
//                 const calculatedData = calculateVolumeDifferenceAndChangePercentage(response);
//                 setTableData(calculatedData);
//             } catch (error) {
//                 console.error('Error fetching volume ratios:', error);
//             }
//         };

//         fetchList();
//         return () => {
//             abortController1.abort();
//         };
//     }, [apiListName]);

//     const handleSort = (column: string) => {
//         if (sortColumn === column) {
//             // Toggle sorting direction if same column is clicked again
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             // Set sorting column and default to ascending direction
//             setSortColumn(column);
//             setSortDirection('asc');
//         }
//     };

//     // Sort tableData based on sortColumn and sortDirection
//     const sortedData = tableData.sort((a, b) => {
//         const aValue = sortColumn === 'volumeRatio' ? a.volumeRatio : a.changePercentage;
//         const bValue = sortColumn === 'volumeRatio' ? b.volumeRatio : b.changePercentage;
//         if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
//         if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
//         return 0;
//     });

//     return (
//         <div className="overflow-x-auto p-3">
//             <table className="min-w-full bg-transparent shadow-md rounded-lg overflow-hidden">
//                 <thead className="bg-gray-800 text-white">
//                     <tr>
//                         <th className="text-left py-2 px-3 uppercase font-semibold text-sm">Symbol</th>
//                         <th className="text-left py-2 px-3 uppercase font-semibold text-sm">
//                             VR
//                             <button onClick={() => handleSort('volumeRatio')}>
//                                 <ArrowDownUp className={sortColumn === 'volumeRatio' ? (sortDirection === 'asc' ? 'asc' : 'desc') : ''} />
//                             </button>
//                         </th>
//                         <th className="text-left py-2 px-3 uppercase font-semibold text-sm">
//                             Change %
//                             <button onClick={() => handleSort('changePercentage')}>
//                                 <ArrowDownUp className={sortColumn === 'changePercentage' ? (sortDirection === 'asc' ? 'asc' : 'desc') : ''} />
//                             </button>
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="text-gray-700">
//                     {sortedData.map((data, index) => (
//                         <tr key={index} className="border-b">
//                             <td className="text-left py-3 px-4">{data.indexName}</td>
//                             <td className="text-left py-3 px-4">{data.volumeRatio.toFixed(2)}</td>
//                             <td className="text-left py-3 px-4">{data.changePercentage.toFixed(2)}%</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Daily;


// ************************************************************************************************************




import axios from 'axios';
import { ArrowDownUp } from 'lucide-react';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Button } from '../ui/button';



interface IndexData {
    symbol: string;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

interface DailyProps {
    apiListName: string;
    [key: string]: any;
}

const Daily: React.FC<DailyProps> = ({ apiListName }) => {
    const [tableData, setTableData] = useState<{ indexName: string, volumeRatio: number, changePercentage: number }[]>([]);
    const [sortColumn, setSortColumn] = useState<string>('volumeRatio');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchDaily = async (collectionNames: string[], offset: number, signal: AbortSignal) => {
            try {
                const response = await axios.post(`/api/fetchWB`, {
                    collectionNames,
                    offset
                }, { signal });
                return response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };

        const calculateVolumeDifferenceAndChangePercentage = (data: { [indexName: string]: IndexData[] }) => {
            const newData: { indexName: string, volumeRatio: number, changePercentage: number }[] = [];

            Object.keys(data).forEach(indexName => {
                const indexData = data[indexName];
                if (indexData.length >= 2) {
                    const latestVolume = indexData[0].volume;
                    const previousVolume = indexData[1].volume;
                    const latestClose = indexData[0].close
                    const previousClose = indexData[1].close;
                    const volumeRatio = latestVolume / previousVolume;
                    const changePercentage = ((latestClose - previousClose) / previousClose) * 100;
                    newData.push({ indexName, volumeRatio, changePercentage });
                }
            });

            return newData;
        };

        const fetchList = async () => {
            const offset = 0;
            try {
                let collectionNames: string[] = [];
                if (apiListName !== 'index') {
                    const collectionNamesResponse = await axios.get(`/api/nifty50List`);
                    collectionNames = collectionNamesResponse.data;
                } else {
                    collectionNames = [
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
                }

                const response = await fetchDaily(collectionNames, offset, signal1);
                const calculatedData = calculateVolumeDifferenceAndChangePercentage(response);
                setTableData(calculatedData);
            } catch (error) {
                console.error('Error fetching volume ratios:', error);
            }
        };

        fetchList();
        return () => {
            abortController1.abort();
        };
    }, [apiListName]);

    const handleSort = useCallback((column: string) => {
        if (sortColumn === column) {
            // Toggle sorting direction if same column is clicked again
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set sorting column and default to ascending direction
            setSortColumn(column);
            setSortDirection('asc');
        }
    }, [sortColumn, sortDirection]);

    // Sort tableData based on sortColumn and sortDirection using useMemo
    const sortedData = useMemo(() => {
        return tableData.sort((a, b) => {
            const aValue = sortColumn === 'volumeRatio' ? a.volumeRatio : a.changePercentage;
            const bValue = sortColumn === 'volumeRatio' ? b.volumeRatio : b.changePercentage;
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tableData, sortColumn, sortDirection]);


    return (
        <div className="overflow-x-auto p-3">
            <table className="min-w-full bg-transparent shadow-md rounded-lg overflow-hidden">
                <thead className="bg-slate-500 text-white">
                    <tr className='items-center'>
                        <th className="text-left py-2 px-3 uppercase font-semibold text-sm justify-start">Symbol</th>
                        <th className=" bg-emerald-500 gap-2 text-left  py-2 px-3 uppercase font-semibold text-sm items-center justify-center">
                            <div className='flex gap-2'>
                                <div>VR</div>
                                <Button variant={'ghost'} size={'icon'} onClick={() => handleSort('volumeRatio')}>
                                    <ArrowDownUp className={sortColumn === 'volumeRatio' ? (sortDirection === 'asc' ? 'asc' : 'desc') : ''} />
                                </Button>
                            </div>
                        </th>
                        <th className="gap-2 text-left py-2 px-3 uppercase font-semibold text-sm items-center">
                            <p className='text-pretty'>Change %</p>
                            <Button variant={'ghost'} size={'icon'} className='' onClick={() => handleSort('changePercentage')}>
                                <ArrowDownUp className={sortColumn === 'changePercentage' ? (sortDirection === 'asc' ? 'asc' : 'desc') : ''} />
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-neutral-500">
                    {sortedData.map((data, index) => (
                        <tr key={index} className=" border-b border-neutral-200 dark:border-neutral-700">
                            <td className="text-left py-1 px-4">{data.indexName}</td>
                            <td className="text-left py-1 px-4">{data.volumeRatio.toFixed(2)}</td>
                            <td className="text-left py-1 px-4">{data.changePercentage.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );



};

export default Daily;

