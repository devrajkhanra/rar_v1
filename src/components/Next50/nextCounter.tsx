import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useTwoMonthlyCounterStore from '@/store/twoMonthlyCounter';
import useTwoMonthlyDatesStore from '@/store/twoMonthlyDates';
import { formatDateString, getDatesOfTwoMonths } from '@/helpers/dateHelpers';

const NextMonthlyCounter: React.FC = () => {
    const { count, increment, decrement } = useTwoMonthlyCounterStore();
    const { currentDates, setCurrentDates } = useTwoMonthlyDatesStore();

    useEffect(() => {

        const currentDate = getDatesOfTwoMonths(count);
        setCurrentDates(currentDate);
    }, [count]); // Include count in the dependency array

    return (
        <div className='flex items-center gap-3'>
            <div className='flex flex-col gap-1 items-center'>
                {currentDates[0] !== undefined && <p className='text-neutral-400 font-light'>{formatDateString(currentDates[0])}</p>}
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

export default NextMonthlyCounter;
