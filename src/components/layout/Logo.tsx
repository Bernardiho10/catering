import Link from "next/link"
import { Ribbon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" className={cn("flex items-center gap-3 group", className)}>
            <div className="relative">
                {/* Tiff's Inspired Blue Box Logo */}
                <div className="h-14 w-14 bg-primary rounded-sm flex items-center justify-center shadow-md transform transition-transform group-hover:scale-105 duration-300">
                    <Ribbon className="h-8 w-8 text-white stroke-[1.5]" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-black font-sans tracking-tight text-primary leading-none uppercase">
                    Abraham&apos;s
                </span>
                <span className="text-xl font-bold font-sans tracking-tight text-primary leading-none uppercase -mt-0.5">
                    Delight
                </span>
                <span className="text-[10px] font-bold text-accent tracking-[0.05em] uppercase mt-1">
                    A Blessing in Every Slice
                </span>
            </div>
        </Link>
    )
}
