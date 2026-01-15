"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HelpCircle, Search, ChevronDown, Truck, CreditCard, Utensils, Clock, Users, Gift, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const FAQ_CATEGORIES = [
  {
    id: "ordering",
    name: "Ordering & Menu",
    icon: Utensils,
    questions: [
      {
        q: "How do I place an order?",
        a: "You can place an order through our website by browsing our menu, adding items to your cart, and proceeding to checkout. You can also call us directly to place an order over the phone."
      },
      {
        q: "What is your minimum order amount?",
        a: "Our minimum order amount is $50 for delivery orders. There is no minimum for pickup orders."
      },
      {
        q: "Can I customize my order or request special dietary accommodations?",
        a: "Yes! We're happy to accommodate dietary restrictions and preferences. Please note any allergies or special requests in the order notes, or contact us directly to discuss your needs."
      },
      {
        q: "Do you offer vegetarian, vegan, or gluten-free options?",
        a: "We offer a variety of vegetarian and vegan options, and many of our dishes can be prepared gluten-free upon request. Look for dietary labels on our menu items."
      },
      {
        q: "How far in advance should I place my order?",
        a: "For regular orders, we recommend placing your order at least 2 hours in advance. For large catering orders (10+ people), please order at least 24-48 hours ahead."
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "You can modify or cancel your order up to 2 hours before the scheduled delivery time. Contact us immediately if you need to make changes."
      }
    ]
  },
  {
    id: "delivery",
    name: "Delivery & Pickup",
    icon: Truck,
    questions: [
      {
        q: "What areas do you deliver to?",
        a: "We deliver within a 15-mile radius of our kitchen locations. Check our Delivery Areas page to see if we deliver to your address."
      },
      {
        q: "How much does delivery cost?",
        a: "Delivery fees vary based on distance. Standard delivery within 5 miles is $4.99, 5-10 miles is $7.99, and 10-15 miles is $12.99. Free delivery on orders over $150."
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 45-60 minutes from the time your order is confirmed. During peak hours, delivery may take up to 90 minutes."
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order is out for delivery, you'll receive a tracking link via SMS and email to monitor your delivery in real-time."
      },
      {
        q: "Do you offer same-day delivery?",
        a: "Yes, we offer same-day delivery for orders placed before 4 PM. Orders placed after 4 PM will be delivered the next day unless rush delivery is available."
      },
      {
        q: "Can I pick up my order instead?",
        a: "Absolutely! Select 'Pickup' during checkout and choose your preferred pickup time. We'll have your order ready when you arrive."
      }
    ]
  },
  {
    id: "payment",
    name: "Payment & Pricing",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), Apple Pay, Google Pay, and Foody gift cards."
      },
      {
        q: "Is there a service fee?",
        a: "A small service fee of 3% is applied to all orders to help cover operational costs. This is clearly displayed at checkout."
      },
      {
        q: "Do you offer invoicing for corporate accounts?",
        a: "Yes! Corporate account holders can choose to be invoiced monthly. Contact our corporate team to set up an account."
      },
      {
        q: "Are tips included in the total?",
        a: "Tips are not included in the order total. You can add a tip for your delivery driver during checkout or upon delivery."
      },
      {
        q: "Do you offer refunds?",
        a: "We stand behind our food quality. If you're not satisfied with your order, contact us within 24 hours and we'll make it right with a refund or credit."
      }
    ]
  },
  {
    id: "catering",
    name: "Catering & Events",
    icon: Users,
    questions: [
      {
        q: "Do you offer catering for large events?",
        a: "Yes! We specialize in catering for events of all sizes, from intimate gatherings of 10 to large corporate events of 500+. Contact our catering team for a custom quote."
      },
      {
        q: "What's included in your catering packages?",
        a: "Our catering packages include food, serving utensils, plates, napkins, and setup. Premium packages include dedicated service staff and cleanup."
      },
      {
        q: "How far in advance should I book catering?",
        a: "We recommend booking catering at least 1-2 weeks in advance for events under 50 people, and 3-4 weeks for larger events to ensure availability."
      },
      {
        q: "Do you provide tastings before booking?",
        a: "Yes! For catering orders over $500, we offer complimentary tastings at our kitchen. Contact us to schedule a tasting appointment."
      },
      {
        q: "Can you accommodate outdoor events?",
        a: "Absolutely! We have experience catering outdoor events including weddings, corporate picnics, and private parties. We bring appropriate equipment for outdoor service."
      }
    ]
  },
  {
    id: "gift-cards",
    name: "Gift Cards",
    icon: Gift,
    questions: [
      {
        q: "Do gift cards expire?",
        a: "No, Foody gift cards never expire. You can use them at any time for any order."
      },
      {
        q: "Can I check my gift card balance?",
        a: "Yes! Visit our Gift Cards page and enter your gift card code to check your remaining balance."
      },
      {
        q: "Can I use multiple gift cards on one order?",
        a: "Yes, you can combine multiple gift cards on a single order. If the order total exceeds your gift card balance, you can pay the difference with another payment method."
      },
      {
        q: "Can I get a refund on a gift card?",
        a: "Gift cards are non-refundable, but they never expire and can be used for any Foody order."
      }
    ]
  },
  {
    id: "other",
    name: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        q: "Are you hiring?",
        a: "We're always looking for talented individuals to join our team! Visit our Careers page to see current openings."
      },
      {
        q: "Do you have a loyalty or rewards program?",
        a: "Yes! Join Foody Rewards to earn points on every order. Points can be redeemed for discounts, free items, and exclusive perks."
      },
      {
        q: "How can I provide feedback about my order?",
        a: "We love hearing from our customers! You can rate your order through the tracking page, email us at feedback@foody.com, or call our customer service line."
      },
      {
        q: "Do you partner with third-party delivery apps?",
        a: "To ensure the highest quality and freshness, we handle all deliveries in-house. This allows us to maintain our high standards from kitchen to your door."
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

  const filteredCategories = searchQuery
    ? FAQ_CATEGORIES.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.questions.length > 0)
    : FAQ_CATEGORIES

  const activeQuestions = searchQuery
    ? filteredCategories.flatMap((cat, catIndex) => 
        cat.questions.map((q, qIndex) => ({ ...q, id: `${catIndex}-${qIndex}`, category: cat.name }))
      )
    : FAQ_CATEGORIES.find(c => c.id === activeCategory)?.questions.map((q, i) => ({ ...q, id: `${activeCategory}-${i}` })) || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium border border-amber-200/50 dark:border-amber-500/20 mb-6">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Frequently Asked <span className="text-golden">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions about ordering, delivery, catering, and more.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap justify-center gap-3 mb-10"
              >
                {FAQ_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {activeQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border border-border rounded-2xl overflow-hidden bg-card"
                >
                  <button
                    onClick={() => toggleQuestion(question.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground pr-4">{question.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
                        openQuestions.includes(question.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openQuestions.includes(question.id) && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-muted-foreground leading-relaxed">{question.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {activeQuestions.length === 0 && searchQuery && (
              <div className="text-center py-16">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">No results found for "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground mt-2">Try a different search term or browse by category</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="rounded-full gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
