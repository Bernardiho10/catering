"use client"

import { motion } from "framer-motion"
import { Star, Gift, Trophy, Zap, Crown, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"
import { Confetti } from "@/components/magicui/confetti"

const TIERS = [
  { name: "Bronze", points: "0-499", icon: Star, color: "from-amber-600 to-amber-800", benefits: ["1 point per $1 spent", "Birthday reward", "Member-only offers"] },
  { name: "Silver", points: "500-1,499", icon: Trophy, color: "from-slate-400 to-slate-600", benefits: ["1.25 points per $1", "Free delivery on orders $75+", "Priority support", "Early access to new items"] },
  { name: "Gold", points: "1,500+", icon: Crown, color: "from-yellow-400 to-amber-500", benefits: ["1.5 points per $1", "Free delivery always", "Exclusive tastings", "Dedicated concierge", "Anniversary bonus"] },
]

const REWARDS = [
  { points: 100, reward: "$5 off your order" },
  { points: 250, reward: "Free appetizer" },
  { points: 500, reward: "$25 off your order" },
  { points: 1000, reward: "Free entrée (up to $30)" },
]

import { RetroGrid } from "@/components/magicui/retro-grid"

export default function RewardsPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        <RetroGrid className="z-0 opacity-50" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c41e3a]/10 rounded-full text-[#c41e3a] text-sm font-bold mb-6 border border-[#c41e3a]/20">
              <Sparkles className="h-4 w-4" />
              David's Delights Rewards
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
              Earn Points. Get <span className="text-[#c41e3a]">Rewarded.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our exclusive rewards program. Earn points on every warm cookie order and redeem them for sweet treats, merchandise, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="rounded-full gap-2 h-14 px-8 text-base font-bold bg-[#c41e3a] hover:bg-[#a31830] shadow-lg hover:shadow-xl transition-all">
                  <Zap className="h-4 w-4" />
                  Join Now - It's Free
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-bold border-2 hover:bg-muted">
                  Sign In to View Points
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {[
              { step: "1", title: "Order", description: "Place orders online or through our app" },
              { step: "2", title: "Earn", description: "Get 1 point for every $1 you spend" },
              { step: "3", title: "Redeem", description: "Use points for discounts and free items" },
            ].map((item, index) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">Membership Tiers</h2>
            <p className="text-muted-foreground">The more you order, the more you earn.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIERS.map((tier, index) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="rounded-3xl h-full overflow-hidden">
                  <div className={`bg-gradient-to-r ${tier.color} p-6 text-white text-center`}>
                    <tier.icon className="h-10 w-10 mx-auto mb-2" />
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p className="text-sm opacity-90">{tier.points} points</p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">Redeem Your Points</h2>
            <p className="text-muted-foreground">Choose from a variety of rewards.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {REWARDS.map((reward, index) => (
              <motion.div key={reward.points} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="rounded-2xl text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-1 text-primary font-bold text-2xl mb-2">
                      <Gift className="h-5 w-5" />
                      {reward.points}
                    </div>
                    <p className="text-sm text-muted-foreground">points</p>
                    <p className="font-medium mt-3">{reward.reward}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full"
              onClick={() => {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 4000);
              }}
            >
              Preview Celebration 🎉
            </Button>
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
