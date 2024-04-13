'use client'

import Counter from "../Reusable/counter";
import useMonthlyCounterStore from "@/store/monthlyCounter";
import useMonthlyDatesStore from "@/store/monthlyDates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getMonthlyRangeDash } from "@/helpers/dateHelpers";
import Volume from "../Reusable/volume";
import Chng from "../Reusable/chng";



export default function Month() {
    const { count, increment, decrement } = useMonthlyCounterStore();
    const { currentDates, previousDates, setCurrentDates, setPreviousDates } =
        useMonthlyDatesStore();

    return <div className="grid grid-cols-1 p-3">
        <Card>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Monthly</CardTitle>
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
                    functionName={getMonthlyRangeDash} />

            </CardHeader>
            <CardContent className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                <Volume apiVol={"vol"} apiListName={"index"} instrument={"Index"} currentDates={currentDates} previousDates={previousDates} />
                <Volume apiVol={"vol"} apiListName={"next50"} instrument={"Stock"} currentDates={currentDates} previousDates={previousDates} />
            </CardContent>

            <CardHeader className='flex flex-row justify-between items-center'>
                <CardDescription>Top Gainer / Loser</CardDescription>
            </CardHeader>

            <CardContent className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                <Chng apiChng={"chng"} apiListName={"index"} instrument={"Index"} currentDates={currentDates} previousDates={previousDates} />
                <Chng apiChng={"chng"} apiListName={"next50"} instrument={"Stock"} currentDates={currentDates} previousDates={previousDates} />
            </CardContent>
        </Card>
    </div>
}