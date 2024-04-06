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
import useMonthlyDatesStore from "@/store/monthlyDates";
import axios from "axios";

interface MonthlyResponse {
    [key: string]: { Close: number }[];
}

export function BroadMonthlyChng() {
    const { currentDates, previousDates } = useMonthlyDatesStore();
    const [chngPercentages, setChngPercentages] = useState<MonthlyResponse>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchMonthlyChng = async (dates1: string[], dates2: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/broadMonthlyChng', {
                    collectionNames: ["Nifty 50", "Nifty Next 50", "Nifty Midcap 50",],
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
                const response = await fetchMonthlyChng(previousDates, currentDates, signal1);
                setChngPercentages(response);

            } catch (error) {
                console.error('Error fetching volume ratios:', error);
            }
        };

        fetchChanges();
        return () => {
            abortController1.abort();
        };
    }, [previousDates, currentDates]);

    const chartData = Object.keys(chngPercentages).map(key => ({
        name: key,
        'chng%': chngPercentages[key]
    }));

    return (
        <ResponsiveContainer width='25%' height={150}>
            <BarChart data={chartData}>
                <XAxis dataKey="name" angle={-45} fontSize={10} />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="chng%" fill="#0366fc" barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    );
}
