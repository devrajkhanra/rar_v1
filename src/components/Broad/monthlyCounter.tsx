import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useMonthlyCounterStore from '@/store/monthlyCounter';
import useMonthlyDatesStore from '@/store/monthlyDates';
import { formatDateString, formatMonthDate, getMonthlyRangeDash } from '@/helpers/dateHelpers';

const BroadMonthlyCounter: React.FC = () => {
    const { count, increment, decrement } = useMonthlyCounterStore();
    const { currentDates, previousDates, setCurrentDates, setPreviousDates } = useMonthlyDatesStore();

    useEffect(() => {

        const currentDate = getMonthlyRangeDash(count);
        const previousDate = getMonthlyRangeDash(count - 1);

        setCurrentDates(currentDate);
        setPreviousDates(previousDate);
    }, [count]); // Include count in the dependency array

    return (
        <div className='flex items-center gap-3'>
            <div className='flex flex-col items-center'>
                {previousDates[0] !== undefined && <p className='text-neutral-400 font-light text-sm'>{formatDateString(previousDates[0])}</p>}
                <Button size={'icon'} variant={'ghost'} onClick={decrement} className='text-neutral-300 hover:text-indigo-400'><ArrowLeft /></Button>
            </div>

            <p className='font-light text-sm'>Count: {count}</p>

            <div className='flex flex-col items-center'>
                {currentDates[0] !== undefined && <p className='text-neutral-400 font-light  text-sm'>{formatDateString(currentDates[currentDates.length - 1])}</p>}
                <Button size={'icon'} variant={'ghost'} onClick={increment} className='text-neutral-300 hover:text-indigo-400'><ArrowRight /></Button>
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

export default BroadMonthlyCounter;
