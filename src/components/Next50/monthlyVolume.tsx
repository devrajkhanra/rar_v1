import React, { useEffect, useState } from 'react';
import useMonthlyDatesStore from "@/store/monthlyDates";
import axios from "axios";
import { ScrollArea } from '../ui/scroll-area';

interface MonthlyResponse {
    [key: string]: number;
}

export function BroadMonthlyVolume() {
    const { currentDates, previousDates } = useMonthlyDatesStore();
    const [volumeRatios, setVolumeRatios] = useState<MonthlyResponse>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchMonthlyVolume = async (collectionNames: string[], dates1: string[], dates2: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/broadMonthlyVol', {
                    collectionNames,
                    dates1,
                    dates2
                }, { signal });
                return response.data;
            } catch (error) {
                console.error('Error fetching monthly volume:', error);
                throw error;
            }
        };

        const fetchVolumeRatios = async () => {
            try {
                const collectionNamesResponse = await axios.get('/api/nifty50List');
                const collectionNames = collectionNamesResponse.data;
                if (collectionNames) {
                    const response = await fetchMonthlyVolume(collectionNames, previousDates, currentDates, signal1);
                    setVolumeRatios(response);
                }
            } catch (error) {
                console.error('Error fetching volume ratios:', error);
            }
        };

        fetchVolumeRatios();
        return () => {
            abortController1.abort();
        };
    }, [previousDates, currentDates]);

    const sortedData = Object.entries(volumeRatios).sort((a, b) => b[1] - a[1]);

    return (
        <div className='flex flex-col gap-1'>
            <h2 className='font-bold'>Monthly Volume Break</h2>
            <table className='border rounded-lg'>
                <thead className='border-b'>
                    <tr className='bg-slate-600 text-slate-200 table-row'>
                        <th className='text-left'>Stock</th>
                        <th className='text-right'>Volume</th>
                    </tr>
                </thead>

                <ScrollArea className='h-28 w-full'>
                    <tbody>
                        {(sortedData).map(([stock, volume]) => (
                            <tr key={stock} className='text-sm font-light'>
                                <td className='text-left'>{stock}</td>
                                <td className='text-right'>{volume.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </ScrollArea>

            </table>
        </div>
    );
}
