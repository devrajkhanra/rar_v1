import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ScrollArea } from '../ui/scroll-area';
import useWeeklyDatesStore from '@/store/weeklyDates';

interface MonthlyResponse {
    [key: string]: number;
}

export function BroadWeeklyVolumeSec() {
    const { currentDates, previousDates } = useWeeklyDatesStore();
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
                console.error('Error fetching weekly volume:', error);
                throw error;
            }
        };

        const fetchVolumeRatios = async () => {
            try {
                const collectionNames = [
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

    if (sortedData.length === 0) {
        return
    }

    return (
        <div className='flex flex-col gap-1'>
            <h2 className='font-bold'>Weekly Volume Break</h2>
            <table className='border rounded-lg'>


                <ScrollArea className='h-28 w-48 '>
                    <thead className='border-b'>
                        <tr className='bg-slate-600 text-slate-200 table-row'>
                            <th className='text-left'>Indice</th>
                            <th className='text-right'>Volume</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {(sortedData).map(([stock, volume]) => (
                            <tr key={stock} className='text-sm font-light table-row'>
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
