import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { formatDateString, getWeeklyRangeDash } from '@/helpers/dateHelpers';
import useWeeklyCounterStore from '@/store/weeklyCounter';
import useWeeklyDatesStore from '@/store/weeklyDates';

const BroadWeeklyCounter: React.FC = () => {
    const { count, increment, decrement } = useWeeklyCounterStore();
    const { currentDates, previousDates, setCurrentDates, setPreviousDates } = useWeeklyDatesStore();

    useEffect(() => {

        const currentDate = getWeeklyRangeDash(count);
        const previousDate = getWeeklyRangeDash(count - 1);

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

            {/* <ul>
                <p>Previous</p>
                {previousDates.map(date => (
                    <li key={date}>{date}</li>
                ))}
            </ul>
            <br />
            <ul>
                <p>Current</p>
                {currentDates.map(date => (
                    <li key={date}>{date}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default BroadWeeklyCounter;
