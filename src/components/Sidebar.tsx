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
        <div className="flex flex-col gap-4 w-[52px] sm:w-[200px] md:w-[250px] lg:w-[300px] border-r min-h-screen p-4 fixed">
            <div>
                <UserItem />
            </div>

            <div className="flex flex-col gap-4">
                {firstFourItems.length > 0 && (
                    <ul className="divide-y divide-transparent sm:rounded-lg sm:border ">
                        <li className="hidden sm:block px-2 font-semibold bg-slate-200 text-sm md:text-base dark:bg-slate-800 dark:text-slate-400">
                            Broad
                        </li>
                        {firstFourItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-start sm:p-2 hover:bg-slate-200 hover:cursor-pointer sm:text-sm md:text-base dark:hover:bg-slate-800 dark:hover:text-neutral-500"
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="sm:block sm:mr-2 text-neutral-500">
                                    <span
                                        className={
                                            selectedItems.includes(item as Item)
                                                ? "font-bold text-violet-600"
                                                : "font-thin"
                                        }
                                    >
                                        {itemIconMap[item]}
                                    </span>
                                </div>
                                <span className="hidden sm:block text-neutral-500">
                                    <span
                                        className={
                                            selectedItems.includes(item as Item)
                                                ? "font-bold text-violet-600"
                                                : ""
                                        }
                                    >
                                        {item}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                {remainingItems.length > 0 && (
                    <ul className="divide-y divide-transparent sm:rounded-lg sm:border">
                        <li className="hidden sm:block px-2 font-semibold bg-slate-200 text-sm md:text-base dark:bg-slate-800 dark:text-slate-400">
                            Sectorial
                        </li>
                        {remainingItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-start sm:p-2 hover:bg-slate-200 hover:cursor-pointer sm:text-sm md:text-base dark:hover:bg-slate-800 dark:hover:text-neutral-500"
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="sm:block sm:mr-2 text-neutral-500">
                                    <span
                                        className={
                                            selectedItems.includes(item as Item)
                                                ? "font-bold text-violet-600"
                                                : "font-thin"
                                        }
                                    >
                                        {itemIconMap[item]}
                                    </span>
                                </div>
                                <span className="hidden sm:block text-neutral-500">
                                    <span
                                        className={
                                            selectedItems.includes(item as Item)
                                                ? "font-bold text-violet-600"
                                                : ""
                                        }
                                    >
                                        {item}
                                    </span>
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
