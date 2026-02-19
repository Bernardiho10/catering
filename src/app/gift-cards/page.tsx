"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, CreditCard, Mail, Users, Heart, Sparkles, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { BlurFade } from "@/components/magicui/blur-fade"

const GIFT_CARD_AMOUNTS = [25, 50, 75, 100, 150, 200]

const OCCASIONS = [
  { id: "birthday", label: "Birthday", icon: "🎂" },
  { id: "thank-you", label: "Thank You", icon: "🙏" },
  { id: "congratulations", label: "Congratulations", icon: "🎉" },
  { id: "thinking-of-you", label: "Thinking of You", icon: "💭" },
  { id: "get-well", label: "Get Well Soon", icon: "💐" },
  { id: "just-because", label: "Just Because", icon: "💝" },
]

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "physical">("email")
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [selectedOccasion, setSelectedOccasion] = useState("birthday")
  const [isLoading, setIsLoading] = useState(false)

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount

  const handlePurchase = async () => {
    if (!recipientName || !senderName) {
      toast.error("Please fill in all required fields")
      return
    }
    if (deliveryMethod === "email" && !recipientEmail) {
      toast.error("Please enter recipient email")
      return
    }
    if (!finalAmount || finalAmount < 10 || finalAmount > 500) {
      toast.error("Gift card amount must be between $10 and $500")
      return
    }

    setIsLoading(true)
    toast.success("Redirecting to checkout...")

    setTimeout(() => {
      setIsLoading(false)
      toast.info("Gift card checkout is currently in demo mode.")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                <Gift className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Gift of Blessings</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Give the <br />
                <span className="text-accent italic font-serif normal-case tracking-normal">Perfect Gift</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto">
                Treat your loved ones to Abraham&apos;s Organic Treats. The perfect way to share a blessing, any time.
              </p>
              <div className="flex justify-center pt-6">
                <Button size="lg" className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl">
                  Start Gifting
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Gift Card Builder */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
            {/* Left: Gift Card Preview */}
            <BlurFade delay={0.2} inView className="lg:sticky lg:top-40">
              <div className="space-y-8">
                <div className="relative aspect-[16/10] bg-primary rounded-sm overflow-hidden shadow-2xl p-10 flex flex-col justify-between border-8 border-white group">
                  <div className="absolute inset-0 bg-blue-50/5 opacity-10 group-hover:opacity-20 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 text-white">
                      <Sparkles className="h-6 w-6 text-accent" />
                      <span className="font-black uppercase tracking-[0.2em] text-xs">Abraham&apos;s Delight</span>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Gift Value</p>
                    <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                      ${finalAmount ? finalAmount.toFixed(0) : "0"}
                    </p>
                  </div>
                  <div className="absolute bottom-10 right-10 text-white/10">
                    <CreditCard className="h-20 w-20" />
                  </div>
                </div>

                <Card className="rounded-sm border-blue-50 bg-blue-50/10 p-8 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-primary/40">To:</span>
                    <span className="text-primary">{recipientName || "Recipient Name"}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-primary/40">From:</span>
                    <span className="text-primary">{senderName || "Your Name"}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-primary/40">Occasion:</span>
                    <span className="text-primary flex items-center gap-2">
                      {OCCASIONS.find(o => o.id === selectedOccasion)?.icon} {OCCASIONS.find(o => o.id === selectedOccasion)?.label}
                    </span>
                  </div>
                  {message && (
                    <div className="pt-4 border-t border-blue-50/50">
                      <p className="text-xs font-medium text-primary/60 italic leading-relaxed">&quot;{message}&quot;</p>
                    </div>
                  )}
                </Card>
              </div>
            </BlurFade>

            {/* Right: Gift Card Form */}
            <div className="space-y-12">
              <BlurFade delay={0.3} inView>
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">1. Choose Amount</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {GIFT_CARD_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
                        }}
                        className={`h-16 rounded-sm border-2 font-black text-sm transition-all flex items-center justify-center ${selectedAmount === amount && !customAmount
                            ? "border-primary bg-primary text-white shadow-xl"
                            : "border-blue-50 text-primary/40 hover:border-primary/30"
                          }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-3 block">Or a Custom Amount ($10 - $500)</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-primary/30">$</span>
                      <Input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="0.00"
                        className="pl-10 h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-black text-lg text-primary"
                      />
                    </div>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.4} inView>
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">2. Delivery Method</h3>
                  <RadioGroup value={deliveryMethod} onValueChange={(v) => setDeliveryMethod(v as "email" | "physical")} className="grid sm:grid-cols-2 gap-4">
                    <label className={`flex flex-col gap-2 p-6 rounded-sm border-2 cursor-pointer transition-all ${deliveryMethod === "email" ? "border-primary bg-blue-50/30" : "border-blue-50"
                      }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-primary">eGift Card</span>
                        <RadioGroupItem value="email" id="email" />
                      </div>
                      <span className="text-[10px] font-medium text-primary/60">Delivered via Email</span>
                    </label>
                    <label className={`flex flex-col gap-2 p-6 rounded-sm border-2 cursor-pointer transition-all ${deliveryMethod === "physical" ? "border-primary bg-blue-50/30" : "border-blue-50"
                      }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Physical</span>
                        <RadioGroupItem value="physical" id="physical" />
                      </div>
                      <span className="text-[10px] font-medium text-primary/60">Sent via Mail</span>
                    </label>
                  </RadioGroup>
                </div>
              </BlurFade>

              <BlurFade delay={0.5} inView>
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">3. Personalize</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Recipient</Label>
                      <Input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Their Name" className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Sender</Label>
                      <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Your Name" className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" />
                    </div>
                  </div>
                  {deliveryMethod === "email" && (
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Recipient Email</Label>
                      <Input type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="their@email.com" className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Occasion</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ.id}
                          onClick={() => setSelectedOccasion(occ.id)}
                          className={`h-12 rounded-sm border-2 text-[10px] font-black uppercase tracking-widest transition-all ${selectedOccasion === occ.id
                              ? "border-primary bg-primary text-white"
                              : "border-blue-50 text-primary/40 hover:border-primary/20"
                            }`}
                        >
                          {occ.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Message</Label>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Add a personal touch..." className="min-h-[100px] rounded-sm border-blue-50 focus-visible:ring-primary font-medium resize-none p-4" />
                  </div>
                </div>
              </BlurFade>

              <Button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full h-16 rounded-sm text-sm font-black uppercase tracking-widest shadow-2xl bg-primary hover:bg-primary/90"
              >
                Checkout — ${finalAmount ? finalAmount.toFixed(2) : "0.00"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-12 bg-blue-50/10 border-t border-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { icon: Check, text: "Never Expires" },
              { icon: Sparkles, text: "Use Online or In-Store" },
              { icon: Gift, text: "Gift Box Packaging" },
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <benefit.icon className="h-5 w-5 text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
