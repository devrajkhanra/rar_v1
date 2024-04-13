import React, { ReactNode, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import Charting from './charting';

interface ChartProps {
    title: string;
    monthlyCounter: ReactNode;
}

const Chart: React.FC<ChartProps> = ({ title, monthlyCounter }) => {

    return (
        <div className="grid grid-cols-1 gap-4 p-3">

            <Card>

                <CardHeader className='flex flex-row justify-between items-center'>

                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>Price Volume Chart</CardDescription>
                    </div>
                    {monthlyCounter}
                </CardHeader>

                <CardContent className='h-fit'>
                    <Charting title={title} />
                </CardContent>

            </Card>
        </div>
    );
}

export default Chart;
