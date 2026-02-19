"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const announcements = [
    {
        id: 1,
        text: "RED VELVET COOKIES + OUR NEW REWARDS PROGRAM IS HERE! + COOKIE PIES",
        link: "/menu",
        bgColor: "bg-primary",
    },
    {
        id: 2,
        text: "ABRAHAM'S REWARDS: JOIN FOR FREE TREATS + EARN EVERY TIME YOU SHOP",
        link: "/rewards",
        bgColor: "bg-primary",
    },
]

export function AnnouncementBar() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    if (!isVisible) return null

    const announcement = announcements[currentIndex]

    return (
        <div className={cn(
            "relative py-2.5 text-white text-sm font-medium transition-colors",
            announcement.bgColor
        )}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-center gap-4">
                {/* Previous Button */}
                <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
                    className="hidden sm:flex items-center justify-center h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Previous announcement"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Announcement Text */}
                <Link
                    href={announcement.link}
                    className="text-center hover:underline transition-all"
                >
                    {announcement.text}
                </Link>

                {/* Next Button */}
                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
                    className="hidden sm:flex items-center justify-center h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Next announcement"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>

                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Close announcement"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
                {announcements.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "h-1 rounded-full transition-all",
                            index === currentIndex ? "w-4 bg-white" : "w-1 bg-white/40"
                        )}
                        aria-label={`Go to announcement ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
