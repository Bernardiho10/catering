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
    if (finalAmount < 10 || finalAmount > 500) {
      toast.error("Gift card amount must be between $10 and $500")
      return
    }

    setIsLoading(true)
    
    // TODO: Integrate with Stripe for gift card purchase
    // This would create a Stripe checkout session for the gift card
    toast.success("Redirecting to checkout...")
    
    setTimeout(() => {
      setIsLoading(false)
      toast.info("Gift card checkout coming soon!")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-amber-50/30 to-background dark:from-background dark:via-amber-950/10 dark:to-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium border border-amber-200/50 dark:border-amber-500/20 mb-6">
              <Gift className="h-4 w-4" />
              The Perfect Gift
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Give the Gift of <span className="text-golden">Delicious Food</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Treat someone special to a memorable dining experience. Our gift cards never expire and can be used for any catering order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Card Builder */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left: Gift Card Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="sticky top-24 rounded-3xl overflow-hidden border-2 border-amber-200/50 dark:border-amber-500/20 shadow-xl">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-amber-500 via-primary to-blue-500 p-8 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-white/90">
                      <Sparkles className="h-5 w-5" />
                      <span className="font-heading font-semibold text-lg">Foody</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">Premium Catering Gift Card</p>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/70 text-sm mb-1">Gift Card Value</p>
                    <p className="text-4xl md:text-5xl font-bold text-white">
                      ${finalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white/50">
                    <CreditCard className="h-12 w-12" />
                  </div>
                </div>
                <CardContent className="p-6 bg-muted/30">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">To:</span>
                      <span className="font-medium text-foreground">{recipientName || "Recipient Name"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">From:</span>
                      <span className="font-medium text-foreground">{senderName || "Your Name"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Occasion:</span>
                      <span className="font-medium text-foreground">
                        {OCCASIONS.find(o => o.id === selectedOccasion)?.icon} {OCCASIONS.find(o => o.id === selectedOccasion)?.label}
                      </span>
                    </div>
                    {message && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground italic">"{message}"</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right: Gift Card Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Amount Selection */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    Select Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {GIFT_CARD_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
                        }}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                          selectedAmount === amount && !customAmount
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Label htmlFor="custom-amount" className="text-sm text-muted-foreground mb-2 block">
                      Or enter a custom amount ($10 - $500)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="custom-amount"
                        type="number"
                        min="10"
                        max="500"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="pl-7 rounded-xl"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Delivery Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={deliveryMethod} onValueChange={(v) => setDeliveryMethod(v as "email" | "physical")}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        deliveryMethod === "email" ? "border-primary bg-primary/5" : "border-border"
                      }`}>
                        <RadioGroupItem value="email" id="email" />
                        <div>
                          <p className="font-medium">eGift Card</p>
                          <p className="text-sm text-muted-foreground">Instant email delivery</p>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        deliveryMethod === "physical" ? "border-primary bg-primary/5" : "border-border"
                      }`}>
                        <RadioGroupItem value="physical" id="physical" />
                        <div>
                          <p className="font-medium">Physical Card</p>
                          <p className="text-sm text-muted-foreground">Ships in 2-3 days</p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Occasion */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Occasion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {OCCASIONS.map((occasion) => (
                      <button
                        key={occasion.id}
                        onClick={() => setSelectedOccasion(occasion.id)}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          selectedOccasion === occasion.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-lg mr-2">{occasion.icon}</span>
                        {occasion.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recipient Details */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Recipient Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient-name">Recipient Name *</Label>
                      <Input
                        id="recipient-name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Their name"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sender-name">Your Name *</Label>
                      <Input
                        id="sender-name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your name"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  {deliveryMethod === "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="recipient-email">Recipient Email *</Label>
                      <Input
                        id="recipient-email"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="their@email.com"
                        className="rounded-xl"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (optional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a personal message..."
                      className="rounded-xl resize-none"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Purchase Button */}
              <Button
                onClick={handlePurchase}
                disabled={isLoading}
                size="lg"
                className="w-full rounded-full text-lg py-6 gap-2"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    Purchase Gift Card - ${finalAmount.toFixed(2)}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>

              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Check, text: "Never expires" },
                  { icon: Gift, text: "Instant delivery" },
                  { icon: CreditCard, text: "Use on any order" },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <benefit.icon className="h-4 w-4 text-primary" />
                    {benefit.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Check Balance Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-semibold mb-4">Check Your Balance</h2>
            <p className="text-muted-foreground mb-6">
              Already have a Foody gift card? Check your remaining balance here.
            </p>
            <div className="flex gap-3">
              <Input
                placeholder="Enter gift card code"
                className="rounded-full"
              />
              <Button variant="outline" className="rounded-full px-6">
                Check Balance
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
