'use client'
export default function UserItem() {
    return <div className="flex items-center justify-center gap-2 border rounded-[8px] p-4 ">
        <div className="avatar rounded-full h-8 w-8 bg-emerald-500 text-white font-[700] flex items-center justify-center">
            <p>DK</p>
        </div>
        <div>
            <p className="text-[16px] font-bold">Devraj Khanra</p>
            <p className="text-[12px] text-neutral-500 ">khanradevraj@gmail.com</p>
        </div>
    </div>
}