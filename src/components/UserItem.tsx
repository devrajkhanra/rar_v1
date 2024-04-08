"use client";
export default function UserItem() {
    return (
        <div className="flex items-center justify-center gap-2 border rounded-[8px] p-4  sm:bg-emerald-500 md:bg-transparent">
            <div className="md:avatar rounded-full md:h-5 md:w-5 lg:h-8 lg:w-8 bg-emerald-500 text-white lg:font-[700] md:font-[300] md:flex items-center justify-center hidden sm:hidden">
                <p className="md:text-sm lg:text-sm">DK</p>
            </div>
            <div>
                <p className="sm:text-sm md:text-base font-bold">Devraj Khanra</p>
                <p className="sm:text-xs md:text-sm text-neutral-500 ">
                    khanradevraj@gmail.com
                </p>
            </div>
        </div>
    );
}
