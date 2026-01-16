"use client"

import { useEffect, useMemo, useState } from "react"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import { MenuGrid } from "@/features/menu/components/MenuGrid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowDown, Leaf, Clock, Truck, Heart, Star, Flame, Gift, HelpCircle, Building2, MapPinned, Sparkles, ArrowRight, ChevronLeft, ChevronRight, ChefHat, Utensils } from "lucide-react"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Testimonials } from "@/components/sections/Testimonials"
import { AboutTeam } from "@/components/sections/AboutTeam"
import { NewsletterSignup } from "@/components/sections/NewsletterSignup"
import { BehindTheScenes } from "@/components/sections/BehindTheScenes"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { MenuFilterBar } from "@/components/menu/MenuFilterBar"
import { ProductDialog } from "@/features/menu/components/ProductDialog"
import { MenuItem } from "@/features/menu/types"
import Link from "next/link"

export default function Home() {
  const categories = Array.from(new Set(MOCK_MENU_ITEMS.map(item => item.category)))
  const maxPrice = Math.max(...MOCK_MENU_ITEMS.map(item => item.price))
  
  const [selectedFeaturedItem, setSelectedFeaturedItem] = useState<MenuItem | null>(null)
  const [featuredDialogOpen, setFeaturedDialogOpen] = useState(false)

  const handleFeaturedClick = (item: MenuItem) => {
    setSelectedFeaturedItem(item)
    setFeaturedDialogOpen(true)
  }

  const heroSlides = useMemo(() => {
    const items = MOCK_MENU_ITEMS.filter(i => i.image_url).slice(0, 6)
    if (items.length > 0) {
      return items.map(i => ({
        id: String(i.id),
        name: i.name,
        description: i.description,
        image_url: i.image_url as string,
        ctaHref: "/#menu",
        ctaLabel: "Order Now",
      }))
    }
    return [{ id: "placeholder", name: "Today's Catering Highlights", description: "Fresh, chef-crafted dishes prepared daily for your next event.", image_url: "/placeholder-food.jpg", ctaHref: "/#menu", ctaLabel: "Order Now" }]
  }, [])

  const [activeSlide, setActiveSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice])

  const filteredItems = useMemo(() => {
    return MOCK_MENU_ITEMS.filter(item => {
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesDietary = selectedDietary.length === 0 ||
        selectedDietary.every(tag => item.dietary_tags.includes(tag))
      
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]

      return matchesSearch && matchesDietary && matchesPrice
    })
  }, [searchQuery, selectedDietary, priceRange])

  useEffect(() => {
    if (heroSlides.length <= 1) return
    const interval = window.setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length)
    }, 6500)
    return () => window.clearInterval(interval)
  }, [heroSlides.length])

  const activeHero = heroSlides[activeSlide]

  const goPrev = () => {
    setActiveSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)
  }

  const goNext = () => {
    setActiveSlide((s) => (s + 1) % heroSlides.length)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider (Tiff's Treats inspired) */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-background to-blue-50/30 dark:from-amber-950/20 dark:via-background dark:to-blue-950/20" />

        <div className="container mx-auto relative z-10 px-4 md:px-6 pt-10 pb-10">
          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-5">
              {/* Image stage */}
              <div className="relative lg:col-span-3 min-h-[260px] sm:min-h-[360px] lg:min-h-[460px] bg-muted">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHero?.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeHero?.image_url ?? "/placeholder-food.jpg"}
                      alt={activeHero?.name ?? "Featured dish"}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/10" />
                  </motion.div>
                </AnimatePresence>

                {heroSlides.length > 1 && (
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous slide"
                      className="h-10 w-10 rounded-full bg-white/85 dark:bg-zinc-900/70 border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next slide"
                      className="h-10 w-10 rounded-full bg-white/85 dark:bg-zinc-900/70 border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right content panel */}
              <div className="lg:col-span-2 bg-background">
                <div className="h-full flex flex-col justify-center px-6 py-10 md:px-10">
                  <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">Today’s highlight</p>
                  <h1 className="mt-3 text-3xl md:text-4xl font-heading font-semibold text-foreground">
                    {activeHero?.name}
                  </h1>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {activeHero?.description}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link href={activeHero?.ctaHref ?? "/#menu"}>
                      <Button className="rounded-full px-8">
                        {activeHero?.ctaLabel ?? "Order Now"}
                      </Button>
                    </Link>
                    <Link href="/catering">
                      <Button variant="outline" className="rounded-full px-8">
                        Catering
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Ready in 30 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Delivery available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Made fresh daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom segmented nav bar */}
            {heroSlides.length > 1 && (
              <div className="border-t border-border bg-background">
                <div className="grid grid-cols-3 md:grid-cols-6">
                  {heroSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      aria-current={idx === activeSlide ? "true" : "false"}
                      className={`px-3 py-3 text-[10px] sm:text-xs tracking-widest uppercase border-r border-border last:border-r-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        idx === activeSlide
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="line-clamp-1">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Catering-themed visual strip (replaces ribbon) */}
          <div className="mt-6 rounded-3xl border border-border overflow-hidden bg-gradient-to-r from-primary/10 via-amber-500/10 to-blue-500/10">
            <div className="grid md:grid-cols-3">
              <div className="p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Chef-crafted catering</p>
                  <p className="text-sm text-muted-foreground">Plated meals, buffets, and custom menus for events.</p>
                </div>
              </div>
              <div className="p-6 flex items-start gap-4 border-t md:border-t-0 md:border-l md:border-r border-border">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Perfect for any occasion</p>
                  <p className="text-sm text-muted-foreground">Weddings, corporate lunches, birthdays, and more.</p>
                </div>
              </div>
              <div className="p-6 flex items-start gap-4 border-t md:border-t-0">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <MapPinned className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Check delivery instantly</p>
                  <p className="text-sm text-muted-foreground">
                    Confirm delivery for Jackson, Texas, and Chicago — or nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links / Competitive Features */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase text-primary font-medium">Explore</p>
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
                Everything you need for a full-service catering experience
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Gift cards, corporate accounts, rewards, FAQs, delivery zones, and catering packages — all accessible from here.
              </p>
            </div>
            <Link href="/catering">
              <Button variant="outline" className="rounded-full w-fit gap-2">
                View catering packages
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/catering" className="group">
              <Card className="h-full rounded-2xl border-border hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Catering Packages
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Essential, Premium, and Luxury packages with a quote request form.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/corporate" className="group">
              <Card className="h-full rounded-2xl border-border hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Corporate Accounts
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Streamlined business ordering with invoicing + support application.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/gift-cards" className="group">
              <Card className="h-full rounded-2xl border-border hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Gift Cards
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose an amount, occasion, delivery method, and add a message.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rewards" className="group">
              <Card className="h-full rounded-2xl border-border hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Rewards
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tiered rewards program with point redemptions and perks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/faq" className="group">
              <Card className="h-full rounded-2xl border-border hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      FAQs
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Searchable FAQ categories for ordering, delivery, payment, and catering.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/delivery-areas" className="group">
              <Card className="h-full rounded-2xl border-border hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPinned className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Delivery Areas
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Delivery zones with fees and estimated delivery times.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 md:px-6 py-20 space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 px-1"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
            This Week&apos;s Menu
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fresh dishes prepared daily. Order now for same-day delivery.
          </p>
        </motion.div>

        <MenuFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDietary={selectedDietary}
          onDietaryChange={setSelectedDietary}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          maxPrice={maxPrice}
        />

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted/60 p-1.5 h-auto rounded-2xl sm:rounded-full gap-1 flex-wrap sm:flex-nowrap justify-center">
              <TabsTrigger
                value="All"
                className="rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                All Dishes
              </TabsTrigger>
              {categories.map(cat => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all capitalize"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="All" className="animate-in fade-in duration-500">
            {filteredItems.length > 0 ? (
              <MenuGrid items={filteredItems} />
            ) : (
              <div className="text-center py-16 space-y-4">
                <p className="text-lg text-muted-foreground">No dishes match your filters.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedDietary([]); setPriceRange([0, maxPrice]); }}>
                  Clear filters
                </Button>
              </div>
            )}
          </TabsContent>
          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="animate-in fade-in duration-500">
              {filteredItems.filter(item => item.category === cat).length > 0 ? (
                <MenuGrid items={filteredItems.filter(item => item.category === cat)} />
              ) : (
                <div className="text-center py-16 space-y-4">
                  <p className="text-lg text-muted-foreground">No dishes match your filters in this category.</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedDietary([]); setPriceRange([0, maxPrice]); }}>
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Featured This Week - Inspired by Serious Eats / Epicurious */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase text-primary font-medium">Editor&apos;s Pick</p>
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
                Featured This Week
              </h2>
            </div>
            <Button variant="outline" className="rounded-full w-fit">
              View all featured
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_MENU_ITEMS.filter(item => item.featured).slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-2xl border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer" onClick={() => handleFeaturedClick(item)}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Popular
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-semibold text-primary">{formatCurrency(item.price)}</span>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">({item.review_count} reviews)</span>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    {item.benefits && item.benefits.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {item.benefits.map(b => (
                          <span key={b} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind The Scenes - Kitchen Videos */}
      <BehindTheScenes />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* About Team */}
      <AboutTeam />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Featured Item Product Dialog */}
      <ProductDialog
        item={selectedFeaturedItem}
        open={featuredDialogOpen}
        onOpenChange={setFeaturedDialogOpen}
      />
    </div>
  )
}
