"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, Check, Download, RotateCw, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLastUpdatedStore } from "@/store/useLastUpdated";
import axios from "axios";
import { formatDatefromString } from "@/helpers/dateHelpers";
import { Separator } from "./ui/separator";
import { Toaster, toast } from 'sonner';

export default function DownloadData() {
    const { lastUpdatedDate, loading, error, fetchLastUpdatedDate } =
        useLastUpdatedStore();
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [downloadInProgress, setDownloadInProgress] = useState<boolean>(false);

    const formattedDate = useMemo(() => {
        if (!selectedDate) return ""; // Return empty string if no date selected
        return formatDatefromString(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        fetchLastUpdatedDate();
    }, []);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleDownload = async () => {
        if (!selectedDate) return; // Do nothing if no date is selected
        setDownloadInProgress(true); // Start download, show spinner
        const dateStr = await formattedDate

        try {
            await axios.post("/api/parseAndSaveData", {
                dateStr,
            });
            // Show success message in card footer
            setDownloadInProgress(false); // Download completed, hide spinner
            // Fetch last updated date again
            fetchLastUpdatedDate();
            toast.success('Successfully Downloaded')

        } catch (error) {
            console.error("Error downloading data:", error);
            // Handle error here
            setDownloadInProgress(false); // Download failed, hide spinner
            toast.error('Download Failed')
        }
    };

    return (
        <div className="flex gap-2">
            <div className="flex gap-2 items-center justify-center">
                <Label htmlFor="last" className="text-neutral-400">Last Updated:</Label>
                {loading ? (
                    <RotateCw className="animate-spin" size={16} strokeWidth={1} />
                ) : error ? (
                    <AlertCircle size={16} strokeWidth={1} />
                ) : (
                    <p className="text-[12px] text-neutral-500">{lastUpdatedDate}</p>
                )}

            </div>

            <Separator orientation="vertical" />
            <div className="flex gap-2 items-center justify-center">
                <Input
                    type="date"
                    id="select"
                    onChange={handleDateChange}
                    value={selectedDate}
                />
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={handleDownload}
                    disabled={!selectedDate || downloadInProgress}
                    className="hover:text-white hover:bg-green-500 rounded-full w-10 h-8"
                >
                    {downloadInProgress ? (
                        <RotateCw className="animate-spin" size={16} strokeWidth={2} />
                    ) : (
                        <Download size={16} strokeWidth={2} className="hover:cursor-pointer" />
                    )}
                </Button>
            </div>
            <Toaster
                icons={{
                    success: <Check className='rounded-full bg-green-500 mr-4 ' size={16} color="white" />,
                    error: <X className='rounded-full bg-red-500 mr-4 ' size={16} color="white" />
                }}
            />
        </div>
    );
}
