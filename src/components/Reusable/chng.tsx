'use client'
import React, { useEffect, useState } from 'react';
import useMonthlyDatesStore from "@/store/monthlyDates";
import axios from "axios";

interface MonthlyResponse {
    [key: string]: number;
}

interface ChngTableProps {
    apiChng: string;
    apiListName: string;
    instrument: string;
    currentDates: string[];
    previousDates: string[];
}

const Chng: React.FC<ChngTableProps> = ({ apiChng, apiListName, instrument, currentDates, previousDates }) => {
    const [chngPercentages, setChngPercentages] = useState<MonthlyResponse>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchMonthlyChng = async (collectionNames: string[], dates1: string[], dates2: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post(`/api/${apiChng}`, {
                    collectionNames,
                    dates1,
                    dates2
                }, { signal });
                return response.data;
            } catch (error) {
                console.error('Error fetching change:', error);
                throw error;
            }
        };

        const fetchChanges = async () => {
            try {
                if (apiListName !== 'index') {
                    const collectionNamesResponse = await axios.get(`/api/${apiListName}List`);
                    const collectionNames = collectionNamesResponse.data;

                    if (collectionNames) {
                        const response = await fetchMonthlyChng(collectionNames, previousDates, currentDates, signal1);
                        setChngPercentages(response);
                    }
                }
                else {
                    const collectionNames = ["Nifty 50",
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
                    ]

                    if (collectionNames) {
                        const response = await fetchMonthlyChng(collectionNames, previousDates, currentDates, signal1);
                        setChngPercentages(response);
                    }

                }

            } catch (error) {
                console.error('Error fetching volume ratios:', error);
            }
        };

        fetchChanges();
        return () => {
            abortController1.abort();
        };
    }, [previousDates, currentDates]);

    // Convert object to array for sorting
    const sortedData = Object.entries(chngPercentages).sort((a, b) => b[1] - a[1]);

    // Extract top 5 highest and bottom 5 lowest
    const top5Highest = sortedData.slice(0, 5);
    const bottom5Lowest = sortedData.slice(-5);

    return (

        <div className='gap-3 grid grid-cols-1 sm:grid-cols-2'>

            <table className='border rounded-lg'>
                <thead className='border-b'>
                    <tr className='bg-green-600 text-green-200 table-row'>
                        <th className='text-left'>{instrument}</th>
                        <th className='text-right'>Change (%)</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {top5Highest.map(([stock, percentage]) => (
                        <tr key={stock} className='text-sm font-light'>
                            <td className='text-left'>{stock}</td>
                            <td className='text-right'>{percentage.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className='border rounded-lg'>
                <thead className='border-b'>
                    <tr className='bg-red-600 text-red-200 table-row'>
                        <th className='text-left'>{instrument}</th>
                        <th className='text-right'>Change (%)</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {bottom5Lowest.map(([stock, percentage]) => (
                        <tr key={stock} className='text-sm font-light'>
                            <td className='text-left'>{stock}</td>
                            <td className='text-right'>{percentage.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Chng
