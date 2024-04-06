'use client'

import { Sun } from "lucide-react"
import DownloadData from "./DownloadData"

export default function Header() {
    return <div className="container p-4 flex gap-2 justify-between border-b sticky">
        <DownloadData />
        <button><Sun strokeWidth={1} size={16} /></button>
    </div>
}