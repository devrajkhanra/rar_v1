"use client";
import React, { useState } from "react";
import {
    Car,
    LayoutDashboard,
    PiggyBank,
    SignalHigh,
    SignalLow,
    SignalMedium,
} from "lucide-react";
import UserItem from "./UserItem";
import useSidebarStore, { Item } from "@/store/sidebarItems";

// Define a mapping between items and their corresponding icons
const itemIconMap: Record<string, JSX.Element> = {
    BroadDashboard: <LayoutDashboard />,
    "Nifty 50": <SignalHigh />,
    "Next 50": <SignalMedium />,
    "Midcap 50": <SignalLow />,
    SectorialDashboard: <LayoutDashboard />,
    Auto: <Car />,
    Bank: <PiggyBank />,
};

const Sidebar: React.FC = () => {
    const { selectedItems, setSelectedItems } = useSidebarStore();
    const [items, setItems] = useState<string[]>([
        "BroadDashboard",
        "Nifty 50",
        "Next 50",
        "Midcap 50",
        "SectorialDashboard",
        "Auto",
        "Bank",
    ]);

    const handleItemClick = (item: string) => {
        setSelectedItems([item as Item]); // Set only the clicked item as selected
    };

    const firstFourItems = items.slice(0, 4);
    const remainingItems = items.slice(4);

    return (
        <div className="flex flex-col gap-4 sm:w-[200px] md:w-[250px] lg:w-[300px] border-r min-h-screen p-4 fixed">
            <div>
                <UserItem />
            </div>

            <div className="flex flex-col gap-4">
                <ul className="divide-y divide-transparent rounded-lg border">
                    <li className="bg-slate-200 px-2 font-semibold sm:text-sm md:text-base dark:bg-slate-800 dark:text-slate-400">
                        Broad
                    </li>
                    {firstFourItems.map((item, index) => (
                        <li
                            key={index}
                            className="hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-neutral-500 px-3 cursor-pointer flex items-center py-2 text-[16px] text-neutral-500 font-light sm:text-sm md:text-base active:bg-slate-300 active:text-white"
                            onClick={() => handleItemClick(item)}
                        >
                            {itemIconMap[item]} {/* Use icon from the mapping */}
                            <span
                                className={
                                    selectedItems.includes(item as Item)
                                        ? "font-bold ml-2 dark:text-yellow-500"
                                        : "ml-2"
                                }
                            >
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
                {remainingItems.length > 0 && (
                    <ul className="divide-y divide-transparent rounded-lg border">
                        <li className="bg-slate-200 px-2 font-semibold sm:text-sm md:text-base dark:bg-slate-800 dark:text-slate-400">
                            Sectorial
                        </li>
                        {remainingItems.map((item, index) => (
                            <li
                                key={index}
                                className="hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-neutral-500 px-3 cursor-pointer flex items-center py-2 text-[16px] text-neutral-500 font-light sm:text-sm md:text-base active:bg-slate-300 active:text-white"
                                onClick={() => handleItemClick(item)}
                            >
                                {itemIconMap[item]} {/* Use icon from the mapping */}
                                <span
                                    className={
                                        selectedItems.includes(item as Item)
                                            ? "font-bold ml-2"
                                            : "ml-2"
                                    }
                                >
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
