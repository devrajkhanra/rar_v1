import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Charting } from "./charting"
import BroadMonthlyCounter from "./monthlyCounter"

export default function Nifty50() {
    return <div>
        <CardHeader>
            <div className="flex items-center gap-4">
                <div>
                    <CardTitle>Nifty 50</CardTitle>
                    <CardDescription>Price Volume Chart</CardDescription>
                </div>
                <BroadMonthlyCounter />
            </div>
        </CardHeader>
        <CardContent>
            <Charting />
        </CardContent>
    </div>

}