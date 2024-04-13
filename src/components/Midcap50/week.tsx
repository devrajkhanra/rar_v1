'use client'

import Counter from "../Reusable/counter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getWeeklyRangeDash } from "@/helpers/dateHelpers";
import Volume from "../Reusable/volume";
import Chng from "../Reusable/chng";
import useWeeklyCounterStore from "@/store/weeklyCounter";
import useWeeklyDatesStore from "@/store/weeklyDates";



export default function Week() {
    const { count, increment, decrement } = useWeeklyCounterStore();
    const { currentDates, previousDates, setCurrentDates, setPreviousDates } =
        useWeeklyDatesStore();

    return <div className="grid grid-cols-1 p-3">
        <Card>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Weekly</CardTitle>
                    <CardDescription>Volume Ratios</CardDescription>
                </div>
                <Counter
                    decrement={decrement}
                    increment={increment}
                    count={count}
                    currentDates={currentDates}
                    previousDates={previousDates}
                    setCurrentDates={setCurrentDates}
                    setPreviousDates={setPreviousDates}
                    functionName={getWeeklyRangeDash} />

            </CardHeader>
            <CardContent className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                <Volume apiVol={"vol"} apiListName={"index"} instrument={"Index"} currentDates={currentDates} previousDates={previousDates} />
                <Volume apiVol={"vol"} apiListName={"midcap50"} instrument={"Stock"} currentDates={currentDates} previousDates={previousDates} />
            </CardContent>

            <CardHeader className='flex flex-row justify-between items-center'>
                <CardDescription>Top Gainer / Loser</CardDescription>
            </CardHeader>

            <CardContent className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                <Chng apiChng={"chng"} apiListName={"index"} instrument={"Index"} currentDates={currentDates} previousDates={previousDates} />
                <Chng apiChng={"chng"} apiListName={"midcap50"} instrument={"Stock"} currentDates={currentDates} previousDates={previousDates} />
            </CardContent>
        </Card>
    </div>
}