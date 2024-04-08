'use client'
import React, { useState } from "react";
import { Car, LayoutDashboard, PiggyBank, SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import UserItem from "./UserItem";
import useSidebarStore, { Item } from "@/store/sidebarItems";

// Define a mapping between items and their corresponding icons
const itemIconMap: Record<string, JSX.Element> = {
    'BroadDashboard': <LayoutDashboard />,
    "Nifty 50": <SignalHigh />,
    "Next 50": <SignalMedium />,
    "Midcap 50": <SignalLow />,
    'SectorialDashboard': <LayoutDashboard />,
    'Auto': <Car />,
    'Bank': <PiggyBank />,
};

const Sidebar: React.FC = () => {
    const { selectedItems, setSelectedItems } = useSidebarStore();
    const [items, setItems] = useState<string[]>(["BroadDashboard", "Nifty 50", "Next 50", "Midcap 50", "SectorialDashboard", "Auto", "Bank"]);

    const handleItemClick = (item: string) => {
        setSelectedItems([item as Item]); // Set only the clicked item as selected
    };

    const firstFourItems = items.slice(0, 4);
    const remainingItems = items.slice(4);

    return (
        <div className="flex flex-col  gap-4 xs:w-[200px] sm:w-[250px] border-r lg:min-w-[300px] min-h-screen p-4 fixed">
            <div>
                <UserItem />
            </div>

            <div className="flex flex-col gap-4">
                <ul className="divide-y divide-gray-50 rounded-lg border">
                    <li className="bg-slate-200 px-2 font-semibold">Broad</li>
                    {firstFourItems.map((item, index) => (
                        <li key={index} className="hover:bg-slate-200 px-3 cursor-pointer flex items-center py-2 text-[16px] text-neutral-500 font-light" onClick={() => handleItemClick(item)}>
                            {itemIconMap[item]} {/* Use icon from the mapping */}
                            <span className={selectedItems.includes(item as Item) ? "font-bold ml-2" : "ml-2"}>{item}</span>
                        </li>
                    ))}
                </ul>
                {remainingItems.length > 0 && (
                    <ul className="divide-y divide-gray-50  rounded-lg border">
                        <li className="bg-slate-200 px-2 font-semibold">Sectorial</li>
                        {remainingItems.map((item, index) => (
                            <li key={index} className="hover:bg-slate-200 px-3 cursor-pointer flex items-center py-2 text-[16px] text-neutral-500 font-light" onClick={() => handleItemClick(item)}>
                                {itemIconMap[item]} {/* Use icon from the mapping */}
                                <span className={selectedItems.includes(item as Item) ? "font-bold ml-2" : "ml-2"}>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Sidebar;