import React, { useEffect, useState, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from "axios";
import useTwoMonthlyDatesStore from '@/store/twoMonthlyDates';
import { useTheme } from "next-themes";

interface ChartData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

interface ChartSymbol {
    title: string;
}

const Charting: React.FC<ChartSymbol> = ({ title }) => {
    const { currentDates } = useTwoMonthlyDatesStore();
    const [data, setData] = useState<ChartData[]>([]);
    const chartInstance = useRef<any>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;

        const fetchData = async (dates1: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/chart', {
                    collectionNames: [title],
                    dates1,
                }, { signal });
                return response.data[title];
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
        const chartContainer = document.getElementById('chart-container');
        if (!chartContainer) return;

        const containerWidth = chartContainer.clientWidth;
        const containerHeight = chartContainer.clientHeight;

        const chart = createChart(chartContainer, {
            width: containerWidth,
            height: containerHeight,
            grid: { vertLines: { visible: false }, horzLines: { visible: false } },
            layout: { textColor: theme === 'light' ? 'black' : 'white', background: { color: theme === 'light' ? 'white' : '#202124' } } // Adjust text color and background based on theme
        });

        chart.timeScale().fitContent();

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: "#20a619",
            downColor: "#ef5350",
            borderVisible: true,
            borderUpColor: theme === 'light' ? "#000" : "#20a619",
            borderDownColor: theme === 'light' ? "#000" : "#ef5350",
            wickUpColor: theme === 'light' ? "#000" : "#20a619",
            wickDownColor: theme === 'light' ? "#000" : "#ef5350"
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
        <div id="chart-container" style={{ width: '100%', height: '400px' }}></div>
    );
}

export default Charting;
