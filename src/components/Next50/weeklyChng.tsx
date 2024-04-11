'use client'
import React, { useEffect, useState } from 'react';

import axios from "axios";
import useWeeklyDatesStore from '@/store/weeklyDates';

interface MonthlyResponse {
    [key: string]: number;
}

export function BroadWeeklyChng() {
    const { currentDates, previousDates } = useWeeklyDatesStore();
    const [chngPercentages, setChngPercentages] = useState<MonthlyResponse>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchMonthlyChng = async (collectionNames: string[], dates1: string[], dates2: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/broadMonthlyChng', {
                    collectionNames,
                    dates1,
                    dates2
                }, { signal });
                return response.data;
            } catch (error) {
                console.error('Error fetching monthly change:', error);
                throw error;
            }
        };

        const fetchChanges = async () => {
            try {
                const collectionNamesResponse = await axios.get('/api/next50List')
                const collectionNames = collectionNamesResponse.data
                if (collectionNames) {
                    const response = await fetchMonthlyChng(collectionNames, previousDates, currentDates, signal1);
                    setChngPercentages(response);
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
        <div className='flex items-center gap-4'>
            <div className='flex flex-col gap-1'>
                <h2 className='font-bold'>Top Gainer</h2>
                <table className='border rounded-lg w-80'>
                    <thead className='border-b w-full'>
                        <tr className='bg-green-600 text-green-200 table-row'>
                            <th className='text-left'>Stock</th>
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
            </div>

            <div className='flex flex-col gap-1'>
                <h2 className='font-bold'>Top Loser</h2>
                <table className='border rounded-lg  w-80'>
                    <thead className='border-b w-full'>
                        <tr className='bg-red-600 text-red-200 table-row'>
                            <th className='text-left'>Stock</th>
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
        </div>
    );
}
