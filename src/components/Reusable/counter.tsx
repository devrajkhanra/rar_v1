import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatDateString } from '@/helpers/dateHelpers';

interface CounterProps {
    decrement: () => void;
    increment: () => void;
    count: number;
    currentDates: string[];
    previousDates: string[];
    setCurrentDates: (dates: string[]) => void;
    setPreviousDates: (dates: string[]) => void;
    functionName: (count: number) => string[];
}

const Counter: React.FC<CounterProps> = ({
    decrement,
    increment,
    count,
    currentDates,
    previousDates,
    setCurrentDates,
    setPreviousDates,
    functionName
}) => {
    useEffect(() => {
        const currentDate = functionName(count);
        const previousDate = functionName(count - 1);

        setCurrentDates(currentDate);
        setPreviousDates(previousDate);
    }, [count]); // Include count in the dependency array

    return (
        <div className='flex items-center gap-3'>
            <div className='flex flex-col gap-1 items-center'>
                {previousDates[0] !== undefined && <p className='text-neutral-400 font-light'>{formatDateString(previousDates[0])}</p>}
                <Button size={'icon'} variant={'ghost'} onClick={decrement} className='text-neutral-300'><ArrowLeft /></Button>
            </div>

            <p className='font-light'>Count: {count}</p>
            <div className='flex flex-col gap-1 items-center'>
                {currentDates[0] !== undefined && <p className='text-neutral-400 font-light'>{formatDateString(currentDates[currentDates.length - 1])}</p>}
                <Button size={'icon'} variant={'ghost'} onClick={increment} className='text-neutral-300'><ArrowRight /></Button>
            </div>
        </div>
    );
};

export default Counter;
