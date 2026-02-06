"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ShoppingBag, ChevronRight, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const ORDERS = [
    {
        id: "ORD-ACTIVE-01",
        date: "Today",
        time: "12:15 PM",
        total: "$26.50",
        status: "In Progress",
        items: ["Tiff's Mix Dozen", "Double Choc"],
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: "ORD-2891",
        date: "Feb 1, 2026",
        time: "2:30 PM",
        total: "$34.50",
        status: "Delivered",
        items: ["Classic Dozen", "Vanilla Bean Pint"],
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: "ORD-2845",
        date: "Jan 18, 2026",
        time: "7:15 PM",
        total: "$18.00",
        status: "Delivered",
        items: ["Tiff's Mix"],
        image: "https://images.unsplash.com/photo-1499636138143-bd649043ea80?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: "ORD-2799",
        date: "Dec 24, 2025",
        time: "11:00 AM",
        total: "$48.25",
        status: "Delivered",
        items: ["Holiday Pack", "Hot Cocoa Mix"],
        image: "https://images.unsplash.com/photo-1600431562968-ef980c92f0ce?auto=format&fit=crop&w=200&q=80"
    }
]

export default function OrderHistory() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading">Order History</h2>
                    <p className="text-muted-foreground">Track current orders and review past purchases.</p>
                </div>
                <div className="flex w-full sm:w-auto gap-2">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search orders..."
                            className="pl-9 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {ORDERS.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-0">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Image/Status Strip */}
                                    <div className="relative w-full sm:w-32 h-32 sm:h-auto bg-muted shrink-0">
                                        {/* Placeholder or Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${order.image})` }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-lg">{order.id}</span>
                                                    <Badge variant={order.status === "Delivered" ? "secondary" : "default"} className="font-normal">
                                                        {order.status === "Delivered" ? (
                                                            <div className="flex items-center gap-1">
                                                                <CheckCircle className="h-3 w-3" /> Delivered
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3" /> Processing
                                                            </div>
                                                        )}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.date} at {order.time}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-lg">{order.total}</div>
                                                <div className="text-xs text-muted-foreground">Total</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end mt-2">
                                            <p className="text-sm text-muted-foreground line-clamp-1 max-w-[70%]">
                                                {order.items.join(", ")}
                                            </p>
                                            <div className="flex gap-2">
                                                {order.status === "In Progress" ? (
                                                    <Button size="sm" className="bg-primary hover:bg-primary/90">Track Order</Button>
                                                ) : (
                                                    <>
                                                        <Button size="sm" variant="outline">Details</Button>
                                                        <Button size="sm">Reorder</Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
