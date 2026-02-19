"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HelpCircle, Search, ChevronDown, Truck, CreditCard, Utensils, Clock, Users, Gift, Phone, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BlurFade } from "@/components/magicui/blur-fade"

const FAQ_CATEGORIES = [
  {
    id: "ordering",
    name: "Ordering",
    icon: Utensils,
    questions: [
      {
        q: "How do I place an order?",
        a: "You can place an order through our website by browsing our menu, adding items to your cart, and proceeding to checkout. Every order is baked fresh just for you."
      },
      {
        q: "What is your minimum order amount?",
        a: "Our minimum order amount is $15 for local delivery. There is no minimum for pickup orders at our Houston flagship location."
      },
      {
        q: "Do you offer organic options?",
        a: "Every single item at Abraham&apos;s is 100% organic. We believe in purity and holistic ingredients for every blessing we bake."
      }
    ]
  },
  {
    id: "delivery",
    name: "Delivery",
    icon: Truck,
    questions: [
      {
        q: "What areas do you deliver to?",
        a: "We deliver locally within Houston and the surrounding suburbs. We also offer nationwide shipping for our signature organic cakes."
      },
      {
        q: "How long does delivery take?",
        a: "Local deliveries typically arrive within 45-60 minutes. We strive to deliver every treat warm and fresh."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("ordering")
  const [openQuestions, setOpenQuestions] = useState<string[]>([])

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const activeQuestions = FAQ_CATEGORIES.find(c => c.id === activeCategory)?.questions.map((q, i) => ({ ...q, id: `${activeCategory}-${i}` })) || []

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                <HelpCircle className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Help Center</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Common <br />
                <span className="text-accent italic font-serif normal-case tracking-normal">Questions</span>
              </h1>

              {/* Search */}
              <div className="relative max-w-xl mx-auto pt-6">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-6 h-16 rounded-sm border-none bg-white text-primary font-medium shadow-2xl focus-visible:ring-accent"
                />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {FAQ_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border-2 ${activeCategory === category.id
                      ? "bg-primary text-white border-primary shadow-xl"
                      : "bg-white text-primary/40 border-blue-50 hover:border-primary/20"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeQuestions.map((question, index) => (
                <BlurFade key={question.id} delay={0.1 + index * 0.05} inView>
                  <div className="border border-blue-50 rounded-sm overflow-hidden bg-white hover:border-primary/20 transition-all">
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full flex items-center justify-between p-8 text-left group"
                    >
                      <span className="text-sm font-black text-primary uppercase tracking-widest leading-loose pr-8">{question.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-primary/20 group-hover:text-primary transition-all ${openQuestions.includes(question.id) ? "rotate-180 text-primary" : ""
                          }`}
                      />
                    </button>
                    {openQuestions.includes(question.id) && (
                      <div className="px-8 pb-8 pt-0">
                        <p className="text-sm font-medium text-primary/60 leading-relaxed border-t border-blue-50 pt-6 italic">
                          &quot;{question.a}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Strip */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1} inView className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Still Need <span className="text-accent italic font-serif normal-case tracking-normal">Direct Help?</span></h2>
            <p className="text-lg text-white/70 font-medium">Our support team is standing by to assist with your organic treat orders.</p>
            <div className="flex justify-center gap-6 pt-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl">
                  Contact Support
                </Button>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  )
}
