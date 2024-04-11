"use client";
export default function UserItem() {
    return (
        <div className="flex items-center justify-center gap-2 sm:border sm:rounded-lg p-1">
            <div className="avatar bg-emerald-500 rounded-full">
                <p className="p-1 text-white text-xs">DK</p>
            </div>
            <div className="hidden sm:block">
                <p className="text-xs md:text-sm lg:text-base font-normal sm:font-semibold md:font-bold">
                    Devraj Khanra
                </p>

                <p className="text-neutral-500 sm:text-[10px] md:text-sm lg:text-base">
                    khanradevraj@gmail.com
                </p>
            </div>
        </div>
    );
}
