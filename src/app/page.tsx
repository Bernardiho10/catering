"use client"

import { useEffect, useMemo, useState } from "react"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import { MenuGrid } from "@/features/menu/components/MenuGrid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowDown, Leaf, Clock, Truck, Heart } from "lucide-react"

export default function Home() {
  const categories = Array.from(new Set(MOCK_MENU_ITEMS.map(item => item.category)))

  const heroSlides = useMemo(() => {
    const items = MOCK_MENU_ITEMS.filter(i => i.image_url).slice(0, 5)
    if (items.length > 0) {
      return items.map(i => ({
        id: String(i.id),
        name: i.name,
        image_url: i.image_url as string,
      }))
    }
    return [{ id: "placeholder", name: "Today’s Catering Highlights", image_url: "/placeholder-food.jpg" }]
  }, [])

  const [activeSlide, setActiveSlide] = useState(0)

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
        <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-secondary/30" />
        
        <div className="container mx-auto relative z-10 px-4 md:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Leaf className="h-4 w-4" />
                Premium Catering Services
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-foreground leading-tight">
                Exceptional catering for{" "}
                <span className="text-primary">every occasion</span>
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/50 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop"
                  alt="Fresh healthy food bowl"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
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

            {/* Hero Image Carousel (Today's Dishes) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="relative"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 md:px-6 py-20 space-y-12">
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

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-10 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="bg-muted/60 p-1.5 h-auto rounded-full gap-1 flex-nowrap min-w-max">
              <TabsTrigger
                value="All"
                className="rounded-full px-5 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                All Dishes
              </TabsTrigger>
              {categories.map(cat => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-full px-5 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all capitalize"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="All" className="animate-in fade-in duration-500">
            <MenuGrid items={MOCK_MENU_ITEMS} />
          </TabsContent>
          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="animate-in fade-in duration-500">
              <MenuGrid items={MOCK_MENU_ITEMS.filter(item => item.category === cat)} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  )
}
