import React, { useEffect, useState } from 'react';
import useMonthlyDatesStore from "@/store/monthlyDates";
import axios from "axios";
import { ScrollArea } from '../ui/scroll-area';

interface Response {
    [key: string]: number;
}

interface VolumeTableProps {
    apiVol: string;
    apiListName: string;
    instrument: string;
    currentDates: string[];
    previousDates: string[];
}

const Volume: React.FC<VolumeTableProps> = ({ apiVol, apiListName, instrument, currentDates, previousDates }) => {

    const [volumeRatios, setVolumeRatios] = useState<Response>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchMonthlyVolume = async (collectionNames: string[], dates1: string[], dates2: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post(`/api/${apiVol}`, {
                    collectionNames,
                    dates1,
                    dates2
                }, { signal });
                return response.data;
            } catch (error) {
                console.error('Error fetching volume:', error);
                throw error;
            }
        };

        const fetchVolumeRatios = async () => {
            try {
                if (apiListName !== 'index') {
                    const collectionNamesResponse = await axios.get(`/api/${apiListName}List`);
                    const collectionNames = collectionNamesResponse.data;
                    if (collectionNames) {
                        const response = await fetchMonthlyVolume(collectionNames, previousDates, currentDates, signal1);
                        setVolumeRatios(response);
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
                        const response = await fetchMonthlyVolume(collectionNames, previousDates, currentDates, signal1);
                        setVolumeRatios(response);
                    }
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

        <div>
            <table className='rounded-lg w-full shadow'>
                <ScrollArea className='h-64 w-full'>
                    <thead className='bg-slate-400 dark:bg-slate-700'>
                        <tr className=' text-slate-700 dark:text-slate-400'>
                            <th className='text-left'>{instrument}</th>
                            <th className='text-right'>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(sortedData).map(([stock, volume]) => (
                            <tr key={stock} className='text-sm font-light'>
                                <td className='text-left text-neutral-500'>{stock}</td>
                                <td className='text-right text-neutral-500'>{volume.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </ScrollArea>
            </table>
        </div>
    );
}

export default Volume
