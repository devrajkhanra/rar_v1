import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import BroadMonthlyCounter from "./monthlyCounter";
import { BroadMonthlyVolume } from "./monthlyVolume";
import { BroadMonthlyChng } from "./monthlyChng";
import { BroadWeeklyVolume } from "./weeklyVolume";
import { BroadWeeklyChng } from "./weeklyChng";
import BroadWeeklyCounter from "./weeklyCounter";
import { ScrollArea } from "../ui/scroll-area";

export default function BroadDash() {
    return (
        <div className="m-2 h-full">
            <CardHeader>
                <CardTitle>Broad Market</CardTitle>
                <CardDescription>Broad Market Analysis</CardDescription>
            </CardHeader>

            <div>
                <CardContent>
                    <Card className="p-4">
                        <div className="flex gap-4 justify-between">
                            <p className="text-pretty font-normal text-neutral-700">Monthly View</p>
                            <BroadMonthlyCounter />
                        </div>
                        <div className="flex gap-2">
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
                        <div className="flex gap-2">
                            <BroadWeeklyVolume />
                            <BroadWeeklyChng />
                        </div>
                    </Card>
                </CardContent>
            </div>


        </div>
    );
}
