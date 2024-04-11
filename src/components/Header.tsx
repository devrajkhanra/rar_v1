'use client'
import DownloadData from "./DownloadData"
import { ThemeSwitcher } from "./Theme/themeSwitcher"

export default function Header() {
    return <div className="container p-4 flex gap-2 items-center justify-between border-b sticky">
        <DownloadData />
        <ThemeSwitcher />
    </div>
}