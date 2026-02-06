"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight, Box, Clock, Crown, ShoppingBag, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardOverview() {
    const [userName, setUserName] = useState("Guest")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("user")
            if (userStr) {
                try {
                    const user = JSON.parse(userStr)
                    setUserName(user.name || "Guest")
                } catch (e) { console.error(e) }
            }
        }
    }, [])

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold font-heading">Welcome back, {userName}!</h2>
            {/* Header Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tiff's Rewards</CardTitle>
                            <Star className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,250 pts</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                250 pts away from your next $5 reward
                            </p>
                            <Progress value={83} className="h-2 mt-3 bg-muted" indicatorClassName="bg-amber-500" />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100 dark:border-indigo-900 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Crown className="h-24 w-24 rotate-12" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Elite Status</CardTitle>
                            <Crown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">Active</div>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                Free delivery on all orders over $15
                            </p>
                            <p className="text-xs text-muted-foreground mt-3">Renews: Jan 15, 2027</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="hover:shadow-md transition-all border-primary/50 bg-primary/5 cursor-pointer relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Truck className="h-24 w-24 -rotate-12" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-primary">Active Order</CardTitle>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-2xl font-bold">In Progress</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Estimated Delivery: 12:45 PM
                            </p>
                            <div className="flex gap-2 mt-3">
                                <Link href="/tracker" className="w-full">
                                    <Button size="sm" className="w-full text-xs h-8 font-bold shadow-sm">
                                        Track Order
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Quick Actions / Recent Favorites */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold font-heading">Buy It Again</h3>
                    <Button variant="link" className="text-sm h-auto p-0 text-primary">View All Orders</Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="flex flex-row overflow-hidden border-border/50 hover:border-border transition-colors group cursor-pointer">
                        <div className="w-24 bg-muted shrink-0 relative">
                            {/* Placeholder image logic or real image */}
                            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-primary/20" />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-center flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold group-hover:text-primary transition-colors">Classic Dozen</h4>
                                <span className="text-sm font-medium">$22.00</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                                6 Chocolate Chip, 3 Snickerdoodle, 3 Oatmeal Raisin
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" /> Last ordered 2 days ago
                            </div>
                        </div>
                        <div className="p-4 flex items-center border-l bg-muted/20">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>

                    <Card className="flex flex-row overflow-hidden border-border/50 hover:border-border transition-colors group cursor-pointer">
                        <div className="w-24 bg-muted shrink-0 relative">
                            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-primary/20" />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-center flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold group-hover:text-primary transition-colors">Tiff's Mix</h4>
                                <span className="text-sm font-medium">$18.00</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                                12 Chocolate Chip
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" /> Last ordered 2 weeks ago
                            </div>
                        </div>
                        <div className="p-4 flex items-center border-l bg-muted/20">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    )
}
