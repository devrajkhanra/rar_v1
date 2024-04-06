"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, Download, RotateCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLastUpdatedStore } from "@/store/useLastUpdated";
import axios from "axios";
import { formatDatefromString } from "@/helpers/dateHelpers";
import { Separator } from "./ui/separator";

export default function DownloadData() {
    const { lastUpdatedDate, loading, error, fetchLastUpdatedDate } =
        useLastUpdatedStore();
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [downloadInProgress, setDownloadInProgress] = useState<boolean>(false);

    useEffect(() => {
        fetchLastUpdatedDate();
    }, []);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleDownload = async () => {
        if (!selectedDate) return; // Do nothing if no date is selected
        setDownloadInProgress(true); // Start download, show spinner
        const dateStr = await formatDatefromString(selectedDate);

        try {
            await axios.post("/api/parseAndSaveData", {
                dateStr,
            });
            // Show success message in card footer
            setDownloadInProgress(false); // Download completed, hide spinner
            // Fetch last updated date again
            fetchLastUpdatedDate();
        } catch (error) {
            console.error("Error downloading data:", error);
            // Handle error here
            setDownloadInProgress(false); // Download failed, hide spinner
        }
    };

    return (
        <div className="flex gap-2">
            <div className="flex gap-2 items-center justify-center">
                <Label htmlFor="last">Last Updated:</Label>
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
                >
                    {downloadInProgress ? (
                        <RotateCw className="animate-spin" size={16} strokeWidth={1} />
                    ) : (
                        <Download size={16} strokeWidth={1} className="hover:cursor-pointer hover:text-green-600" />
                    )}
                </Button>
            </div>
        </div>
    );
}