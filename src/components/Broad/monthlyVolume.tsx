import React, { useEffect, useMemo, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import useMonthlyDatesStore from "@/store/monthlyDates";
import axios from "axios";

interface MonthlyResponse {
    [key: string]: { Volume: number }[];
}

export function BroadMonthlyVolume() {
    const { currentDates, previousDates } = useMonthlyDatesStore();
    const [volumeRatios, setVolumeRatios] = useState<MonthlyResponse>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchMonthlyVolume = async (dates1: string[], dates2: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/broadMonthlyVol', {
                    collectionNames: ["Nifty 50", "Nifty Next 50", "Nifty Midcap 50",],
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
                const response = await fetchMonthlyVolume(previousDates, currentDates, signal1);
                setVolumeRatios(response);

            } catch (error) {
                console.error('Error fetching volume ratios:', error);
            }
        };

        fetchVolumeRatios();
        return () => {
            abortController1.abort();
        };
    }, [previousDates, currentDates]);


    const chartData = useMemo(() => {
        return Object.keys(volumeRatios).map(key => ({
            name: key,
            ratio: volumeRatios[key]
        }));
    }, [volumeRatios]);


    // const chartData = Object.keys(volumeRatios).map(key => ({
    //     name: key,
    //     ratio: volumeRatios[key]
    // }));

    return (
        <ResponsiveContainer width='25%' height={150}>
            <BarChart data={chartData}>
                <XAxis dataKey="name" angle={-45} fontSize={10} />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={1} stroke="#000" />
                <Bar dataKey="ratio" fill="#8884d8" barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    );
}
