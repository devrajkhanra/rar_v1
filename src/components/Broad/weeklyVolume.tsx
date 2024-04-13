import React, { useEffect, useState } from 'react';
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
import useWeeklyDatesStore from "@/store/weeklyDates";
import axios from "axios";

interface WeeklyResponse {
    [key: string]: { Volume: number }[];
}

export function BroadWeeklyVolume() {
    const { currentDates, previousDates } = useWeeklyDatesStore();
    const [volumeRatios, setVolumeRatios] = useState<WeeklyResponse>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchWeeklyVolume = async (dates1: string[], dates2: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/vol', {
                    collectionNames: ["Nifty 50", "Nifty Next 50", "Nifty Midcap 50",],
                    dates1,
                    dates2
                }, { signal });
                return response.data;
            } catch (error) {
                console.error('Error fetching Weekly volume:', error);
                throw error;
            }
        };

        const fetchVolumeRatios = async () => {
            try {
                const response = await fetchWeeklyVolume(previousDates, currentDates, signal1);
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

    const chartData = Object.keys(volumeRatios).map(key => ({
        name: key,
        ratio: volumeRatios[key]
    }));

    return (
        <ResponsiveContainer width='25%' height={200}>
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
