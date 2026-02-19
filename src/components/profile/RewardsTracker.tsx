"use client"

import { motion } from "framer-motion"
import { Trophy, Gift, Lock, CheckCircle, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RewardsTrackerProps {
    initialData?: {
        points: number;
        tier: string;
        nextTierPoints: number;
        progress: number;
        pointsUntilNext: number;
    } | null;
}

export default function RewardsTracker({ initialData }: RewardsTrackerProps) {
    const data = initialData || {
        points: 0,
        tier: 'Bronze',
        nextTierPoints: 500,
        progress: 0,
        pointsUntilNext: 500
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Points Card */}
                <Card className="flex-1 w-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-amber-600" />
                            Points Balance
                        </CardTitle>
                        <CardDescription>Earn points for every dollar you spend.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-heading mb-2">{data.points.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">pts</span></div>
                        <Progress value={data.progress} className="h-3 mb-2 bg-amber-100 dark:bg-amber-900" indicatorClassName="bg-amber-500" />
                        <p className="text-sm text-muted-foreground">
                            {data.pointsUntilNext > 0
                                ? `${data.pointsUntilNext} points until your next reward!`
                                : 'You have reached the highest tier!'}
                        </p>
                    </CardContent>
                </Card>

                {/* Elite Status Card */}
                <Card className="flex-1 w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Crown className="h-32 w-32 rotate-12" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                            <Crown className="h-5 w-5" />
                            {data.tier} Status
                        </CardTitle>
                        <CardDescription className="text-indigo-600/80 dark:text-indigo-400/80">Active Membership</CardDescription>
                    </CardHeader>
                    {/* ... rest of content remains same but can be made dynamic later ... */}
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Unlimited Free Delivery ($15+ min)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Earn 12 pts per $1 spent</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Free Birthday Tiffwich®</span>
                            </div>
                        </div>
                        <Button variant="secondary" className="w-full mt-6 bg-white/50 hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/40 text-indigo-700 dark:text-indigo-300">
                            Manage Membership
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold font-heading">Redeem Rewards</h3>
                <Tabs defaultValue="available" className="w-full">
                    <TabsList>
                        <TabsTrigger value="available">Available</TabsTrigger>
                        <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="available" className="mt-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { points: 500, name: "$5 Off Reward", icon: Gift },
                                { points: 1000, name: "$10 Off Reward", icon: Gift },
                                { points: 2500, name: "Free Cake Bundle", icon: Gift },
                            ].map((reward, i) => (
                                <Card key={i} className={1250 >= reward.points ? "border-primary/50" : "opacity-70"}>
                                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                            <reward.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold">{reward.name}</div>
                                            <div className="text-sm text-muted-foreground">{reward.points} points</div>
                                        </div>
                                        <Button
                                            disabled={1250 < reward.points}
                                            variant={1250 >= reward.points ? "default" : "outline"}
                                            className="w-full"
                                        >
                                            {1250 >= reward.points ? "Redeem" : <><Lock className="h-3 w-3 mr-2" /> Locked</>}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="redeemed">
                        <div className="text-center py-12 text-muted-foreground">
                            No redeemed rewards yet.
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
