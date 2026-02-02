"use client"

import { Marquee } from "@/components/magicui/marquee"
import { Gift, Truck, Clock, Star } from "lucide-react"

const announcements = [
    { icon: Truck, text: "Free delivery on orders over $30!" },
    { icon: Gift, text: "New! Gift cards now available" },
    { icon: Clock, text: "Same-day delivery available" },
    { icon: Star, text: "Join Rewards and earn points on every order" },
]

export function AnnouncementBar() {
    return (
        <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s]">
                {announcements.map((item, idx) => {
                    const Icon = item.icon
                    return (
                        <div key={idx} className="flex items-center gap-2 mx-8">
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-medium whitespace-nowrap">{item.text}</span>
                        </div>
                    )
                })}
            </Marquee>
        </div>
    )
}
