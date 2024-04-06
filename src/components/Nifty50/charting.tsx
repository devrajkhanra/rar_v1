// import React, { useEffect, useState } from 'react';
// import { createChart } from 'lightweight-charts';
// import useMonthlyDatesStore from "@/store/monthlyDates";
// import axios from "axios";

// interface ChartData {
//     date: string;
//     open: number;
//     high: number;
//     low: number;
//     close: number;
//     volume: number;
// }

// export function Charting() {
//     const { currentDates, previousDates } = useMonthlyDatesStore();
//     const [data, setData] = useState<ChartData[]>([]);

//     useEffect(() => {
//         const abortController1 = new AbortController();
//         const signal1 = abortController1.signal;

//         const fetchData = async (dates1: string[], signal: AbortSignal) => {
//             try {
//                 const response = await axios.post('/api/chart', {
//                     collectionNames: ["Nifty 50"],
//                     dates1,
//                 }, { signal });
//                 return response.data['Nifty 50'];
//             } catch (error) {
//                 console.error('Error fetching monthly volume:', error);
//                 throw error;
//             }
//         };

//         const fetchChartData = async () => {
//             try {
//                 const response = await fetchData(previousDates, signal1);
//                 setData(response);

//             } catch (error) {
//                 console.error('Error fetching volume ratios:', error);
//             }
//         };

//         fetchChartData();
//         return () => {
//             abortController1.abort();
//         };
//     }, [previousDates, currentDates]);

//     useEffect(() => {
//         if (data.length > 0) {
//             renderChart();
//         }
//     }, [data]);

//     const renderChart = () => {
//         const chart = createChart(document.getElementById('chart')!, {
//             width: 800,
//             height: 400,
//             layout: { textColor: 'black', background: { color: 'white' } }
//         });

//         chart.timeScale().fitContent();

//         const candlestickSeries = chart.addCandlestickSeries();

//         const volumeSeries = chart.addHistogramSeries({
//             priceFormat: {
//                 type: 'volume',
//             },
//         });

//         const chartData = data.map(item => ({
//             time: formatDate(item.date), // Format the date here
//             open: item.open,
//             high: item.high,
//             low: item.low,
//             close: item.close,
//             volume: item.volume,
//         }));

//         candlestickSeries.setData(chartData.map(item => ({
//             time: item.time,
//             open: item.open,
//             high: item.high,
//             low: item.low,
//             close: item.close,
//         })));

//         // volumeSeries.setData(chartData.map(item => ({
//         //     time: item.time,
//         //     value: item.volume,
//         // })));
//     };

//     const formatDate = (dateString: string) => {
//         const [day, month, year] = dateString.split('-');
//         return `${year}-${month}-${day}`;
//     };

//     return (
//         <div id="chart"></div>
//     );
// }

import React, { useEffect, useState, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from "axios";
import useTwoMonthlyDatesStore from '@/store/twoMonthlyDates';

interface ChartData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export function Charting() {
    const { currentDates } = useTwoMonthlyDatesStore();
    const [data, setData] = useState<ChartData[]>([]);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchData = async (dates1: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/chart', {
                    collectionNames: ["Nifty 50"],
                    dates1,
                }, { signal });
                return response.data['Nifty 50'];
            } catch (error) {
                console.error('Error fetching monthly volume:', error);
                throw error;
            }
        };

        const fetchChartData = async () => {
            try {
                const response = await fetchData(currentDates, signal1);
                setData(response);

            } catch (error) {
                console.error('Error fetching volume ratios:', error);
            }
        };

        fetchChartData();
        return () => {
            abortController1.abort();
        };
    }, [currentDates]);

    useEffect(() => {
        if (data.length > 0) {
            renderChart();
        }
        // Cleanup previous chart instance
        return () => {
            if (chartInstance.current !== null) {
                chartInstance.current.remove();
            }
        };
    }, [data]);

    const renderChart = () => {
        const chart = createChart(document.getElementById('chart')!, {
            width: 800,
            height: 400,
            grid: { vertLines: { visible: false }, horzLines: { visible: false } },
            layout: { textColor: 'black', background: { color: 'white' } }
        });

        chart.timeScale().fitContent();

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: "#20a619",
            downColor: "#ef5350",
            borderVisible: true,
            borderColor: "#000",
            wickUpColor: "#000",
            wickDownColor: "#000",
        });
        const volumeSeries = chart.addHistogramSeries({
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '',
        });
        volumeSeries.priceScale().applyOptions({
            // set the positioning of the volume series
            scaleMargins: {
                top: 0.8, // highest point of the series will be 70% away from the top
                bottom: 0,
            },
        });

        const chartData = data.map(item => ({
            time: formatDate(item.date), // Convert time to Time type
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume,
        }));

        const candlestickData = chartData.map(item => ({
            time: item.time,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
        }));

        const volumeData = chartData.map(item => ({
            time: item.time,
            value: item.volume,
        }));

        candlestickSeries.setData(candlestickData);
        volumeSeries.setData(volumeData);

        // Save chart instance
        chartInstance.current = chart;
    };

    const formatDate = (dateString: string) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    return (
        <div id="chart"></div>
    );
}
