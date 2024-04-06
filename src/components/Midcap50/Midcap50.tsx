'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Charting } from "./charting"
import MidcapMonthlyCounter from "./midcapCounter"
import { BroadMonthlyChng } from "./monthlyChng"
import BroadMonthlyCounter from "./monthlyCounter"
import { BroadMonthlyVolume } from "./monthlyVolume"
import BroadWeeklyCounter from "./weeklyCounter"
import { BroadWeeklyVolume } from "./weeklyVolume"
import { BroadWeeklyChng } from "./weeklyChng"
import { ScrollArea } from "../ui/scroll-area"


export default function Midcap50() {
    return <ScrollArea className="h-full">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div>
                    <CardTitle>Midcap 50</CardTitle>
                    <CardDescription>Price Volume Chart</CardDescription>
                </div>
                <div>
                    <MidcapMonthlyCounter />
                </div>
            </div>

        </CardHeader>
        <CardContent>
            <Charting />
            <div>
                <CardContent>
                    <Card className="p-4">
                        <div className="flex gap-4">
                            <p className="text-lg font-semibold text-neutral-700">Monthly View</p>
                            <BroadMonthlyCounter />
                        </div>
                        <div className="flex gap-4">
                            <BroadMonthlyVolume />
                            <BroadMonthlyChng />
                        </div>
                    </Card>
                </CardContent>
            </div>

            <div>
                <CardContent>
                    <Card className="p-4">
                        <div className="flex gap-4">
                            <p className="text-lg font-semibold text-neutral-700">Weekly View</p>
                            <BroadWeeklyCounter />
                        </div>
                        <div className="flex gap-4">
                            <BroadWeeklyVolume />
                            <BroadWeeklyChng />
                        </div>
                    </Card>
                </CardContent>
            </div>
        </CardContent>
    </ScrollArea>

}