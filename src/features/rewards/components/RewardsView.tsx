"use client"

import { motion } from "framer-motion"
import { Star, Gift, Trophy, Zap, Crown, Sparkles, Check, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"
import { Confetti } from "@/components/magicui/confetti"
import { REWARDS_CONFIG, REDEMPTION_TIERS } from "@/lib/rewards"
import { BlurFade } from "@/components/magicui/blur-fade"
import { toast } from "sonner"

const TIERS = [
    { name: "Bronze", points: "0-499", icon: Star, benefits: [`${REWARDS_CONFIG.POINTS_PER_DOLLAR} points per $1 spent`, "Birthday reward", "Member-only offers"] },
    { name: "Silver", points: "500-1,499", icon: Trophy, benefits: ["1.25x points bonus", "Free delivery on orders $75+", "Priority support", "Early access to new items"] },
    { name: "Gold", points: "1,500+", icon: Crown, benefits: ["1.5x points bonus", "Free delivery always", "Exclusive tastings", "Dedicated concierge", "Anniversary bonus"] },
]

export default function RewardsView({ userPoints }: { userPoints: number }) {
    const [showConfetti, setShowConfetti] = useState(false);

    // Determine current tier
    const currentTier = userPoints >= 1500 ? "Gold" : userPoints >= 500 ? "Silver" : "Bronze"

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative py-24 md:py-32 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <BlurFade delay={0.1} inView>
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Abraham&apos;s Rewards</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                Earn Points. <br />
                                <span className="text-accent italic font-serif normal-case tracking-normal">Get Blessed.</span>
                            </h1>

                            {/* Points Display */}
                            <div className="inline-block bg-white/5 backdrop-blur-md p-10 rounded-sm border border-white/10 shadow-2xl">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Current Balance</p>
                                <div className="text-5xl md:text-6xl font-black text-white mb-2">{userPoints} PTS</div>
                                <p className="text-xs font-black text-accent uppercase tracking-widest">{currentTier} Member Status</p>
                            </div>

                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto pt-6">
                                Join our family of treat lovers. Every organic bite brings you closer to free rewards and exclusive blessings.
                            </p>
                            <div className="flex flex-wrap gap-6 justify-center pt-6">
                                <Link href="/menu">
                                    <Button size="lg" className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl">
                                        Join Rewards
                                    </Button>
                                </Link>
                                <Link href="/tracker">
                                    <Button size="lg" variant="outline" className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest border-2 border-white text-white hover:bg-white/10">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 border-b border-blue-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            { icon: Gift, title: "1. Order", description: "Place orders online or in-store for your favorite organic treats." },
                            { icon: Zap, title: "2. Earn", description: `Receive ${REWARDS_CONFIG.POINTS_PER_DOLLAR} points for every $1 you spend on our signature cakes.` },
                            { icon: Heart, title: "3. Redeem", description: "Exchange your points for free blessings, discounts, and exclusive merchandise." },
                        ].map((item, index) => (
                            <BlurFade key={item.title} delay={0.1 + index * 0.1} inView>
                                <div className="text-center space-y-6">
                                    <div className="h-16 w-16 rounded-sm bg-blue-50 border border-blue-100/50 flex items-center justify-center mx-auto text-primary">
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-sm font-black text-primary uppercase tracking-widest">{item.title}</h3>
                                    <p className="text-xs font-medium text-primary/60 leading-relaxed max-w-[240px] mx-auto">{item.description}</p>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tiers Section */}
            <section className="py-24 bg-blue-50/10">
                <div className="container mx-auto px-4 md:px-6">
                    <BlurFade delay={0.1} inView>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-4">Membership Tiers</h2>
                            <div className="w-24 h-1 bg-accent mx-auto"></div>
                        </div>
                    </BlurFade>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {TIERS.map((tier, index) => (
                            <BlurFade key={tier.name} delay={0.1 + index * 0.1} inView>
                                <Card className={`rounded-sm h-full flex flex-col border-2 ${currentTier === tier.name ? "border-primary shadow-2xl scale-105" : "border-blue-50 shadow-sm"} bg-white relative`}>
                                    <CardHeader className={`p-8 text-center ${currentTier === tier.name ? "bg-primary text-white" : "bg-blue-50/30 text-primary"}`}>
                                        <tier.icon className={`h-10 w-10 mx-auto mb-4 ${currentTier === tier.name ? "text-accent" : "text-primary/40"}`} />
                                        <CardTitle className="text-lg font-black uppercase tracking-widest">{tier.name}</CardTitle>
                                        <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-60">{tier.points} Points Required</p>
                                    </CardHeader>
                                    <CardContent className="p-8 flex-1 flex flex-col">
                                        <ul className="space-y-4 mb-8 flex-1">
                                            {tier.benefits.map((benefit) => (
                                                <li key={benefit} className="flex items-start gap-3 text-xs font-medium text-primary/70">
                                                    <Check className="h-4 w-4 text-accent shrink-0" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {currentTier === tier.name && (
                                            <div className="text-center font-black text-[10px] text-primary uppercase tracking-widest bg-blue-50 py-3 rounded-sm">
                                                Your Current Tier
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Redemption Tiers */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <BlurFade delay={0.1} inView className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-widest mb-4">Available Rewards</h2>
                        <p className="text-sm font-medium text-primary/60">Share your blessing and redeem your points for something sweet.</p>
                    </BlurFade>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {REDEMPTION_TIERS.map((reward, index) => (
                            <BlurFade key={reward.points} delay={0.1 + index * 0.1} inView>
                                <div className={`h-full bg-white border-2 rounded-sm p-8 text-center flex flex-col gap-4 transition-all duration-300 ${userPoints >= reward.points ? "border-primary shadow-xl scale-105" : "border-blue-50 opacity-60"
                                    }`}>
                                    <div className="flex items-center justify-center gap-2 text-primary">
                                        <Gift className="h-6 w-6 text-accent" />
                                        <span className="text-3xl font-black">{reward.points}</span>
                                    </div>
                                    <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Points</p>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h4 className="text-sm font-black text-primary uppercase tracking-widest leading-loose">
                                            {reward.label}
                                        </h4>
                                    </div>
                                    {userPoints >= reward.points ? (
                                        <Button
                                            size="lg"
                                            className="w-full h-14 rounded-sm bg-primary text-white font-black uppercase tracking-widest text-[10px]"
                                            onClick={() => {
                                                setShowConfetti(true);
                                                setTimeout(() => setShowConfetti(false), 4000);
                                                toast.success(`Redeemed ${reward.label}! Check your email for your code.`)
                                            }}
                                        >
                                            Redeem Now
                                        </Button>
                                    ) : (
                                        <div className="text-[10px] font-black text-primary/20 uppercase tracking-widest">
                                            Need {reward.points - userPoints} More Points
                                        </div>
                                    )}
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            <Confetti
                trigger={showConfetti}
                className="z-50"
            />
        </div>
    )
}
