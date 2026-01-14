"use client"

import { useEffect, useMemo, useState } from "react"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import { MenuGrid } from "@/features/menu/components/MenuGrid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowDown, Leaf, Clock, Truck, Heart, Star, Flame } from "lucide-react"
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
    const items = MOCK_MENU_ITEMS.filter(i => i.image_url).slice(0, 5)
    if (items.length > 0) {
      return items.map(i => ({
        id: String(i.id),
        name: i.name,
        image_url: i.image_url as string,
      }))
    }
    return [{ id: "placeholder", name: "Today's Catering Highlights", image_url: "/placeholder-food.jpg" }]
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Warm & Inviting */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-background to-blue-50/30 dark:from-amber-950/20 dark:via-background dark:to-blue-950/20" />
        
        <div className="container mx-auto relative z-10 px-4 md:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium border border-amber-200/50 dark:border-amber-500/20">
                <Leaf className="h-4 w-4" />
                Premium Catering Services
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-foreground leading-tight">
                Exceptional catering for{" "}
                <span className="text-golden">every occasion</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                From intimate gatherings to corporate events, we bring restaurant-quality cuisine 
                and impeccable service to your venue. Let us handle the details while you enjoy the moment.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="rounded-full px-8 text-base"
                >
                  Browse Menu
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 text-base"
                >
                  How It Works
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Ready in 30 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Made fresh daily</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image Carousel (Today's Dishes) - Side by side with text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-xl bg-muted">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroSlides[activeSlide]?.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroSlides[activeSlide]?.image_url ?? "/placeholder-food.jpg"}
                      alt={heroSlides[activeSlide]?.name ?? "Featured dish"}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 560px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="text-white/80 text-xs tracking-widest uppercase">Today’s Highlights</p>
                  <h3 className="text-white text-xl sm:text-2xl font-heading font-semibold leading-tight">
                    {heroSlides[activeSlide]?.name}
                  </h3>
                </div>
              </div>

              {heroSlides.length > 1 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {heroSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Show slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        idx === activeSlide ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* 100% Fresh Badge */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">100% Fresh</p>
                    <p className="text-sm text-muted-foreground">Local ingredients</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
