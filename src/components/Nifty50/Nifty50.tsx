"use client";

import Chart from "../Candlestick Chart/chart";
import ChartCounter from "../Candlestick Chart/chartCounter";
import Month from "./month";
import Week from "./week";


export default function Nifty50() {

    return (
        <div className="grid grid-cols-1 gap-1">
            <Chart title={"Nifty 50"} monthlyCounter={<ChartCounter />} />
            <Month />
            <Week />
        </div>
    );
}
