"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DeliveryModal } from "@/components/modals/DeliveryModal"
import { LoginModal, RegisterModal } from "@/components/modals/AuthModals"
import { OccasionCategories } from "@/components/sections/OccasionCategories"
import { HeroCarousel } from "@/components/sections/HeroCarousel"
import { AppDownloadSection } from "@/components/sections/AppDownloadSection"
import { BookPromoSection } from "@/components/sections/BookPromoSection"
import { TreatsTruckSection } from "@/components/sections/TreatsTruckSection"
import { AnnouncementBar } from "@/components/sections/AnnouncementBar"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, RotateCcw, Users, Star, Flame } from "lucide-react"
import Image from "next/image"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { ProductDialog } from "@/features/menu/components/ProductDialog"
import { MenuItem } from "@/features/menu/types"
import { FloatingCart } from "@/components/layout/FloatingCart"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function Home() {
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [cartSheetOpen, setCartSheetOpen] = useState(false)

  const handleProductClick = (item: MenuItem) => {
    setSelectedItem(item)
    setProductDialogOpen(true)
  }

  const bestSellers = MOCK_MENU_ITEMS.filter(item => item.featured).slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Hero Carousel */}
      <HeroCarousel onOrderClick={() => setDeliveryModalOpen(true)} />

      {/* Quick Action Buttons */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full gap-2 h-12"
              onClick={() => setDeliveryModalOpen(true)}
            >
              <Gift className="h-5 w-5" />
              Gift Cards
            </Button>
            <Button variant="outline" size="lg" className="rounded-full gap-2 h-12">
              <RotateCcw className="h-5 w-5" />
              Repeat Order
            </Button>
            <Button variant="outline" size="lg" className="rounded-full gap-2 h-12">
              <Users className="h-5 w-5" />
              Order for Multiple Recipients
            </Button>
          </div>
        </div>
      </section>

      {/* Occasion Categories */}
      <OccasionCategories />

      {/* Best Sellers Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.1} inView>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs tracking-widest uppercase text-primary font-semibold mb-2">
                  Customer Favorites
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Best Sellers
                </h2>
              </div>
              <Button variant="outline" className="rounded-full">
                View All
              </Button>
            </div>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((item, index) => (
              <BlurFade key={item.id} delay={0.1 + index * 0.1} inView>
                <Card
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary bg-card"
                  onClick={() => handleProductClick(item)}
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Popular
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <span className="font-bold text-primary shrink-0">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({item.review_count})
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Pie Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <BlurFade delay={0.2} inView>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80"
                  alt="Cookie Pie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </BlurFade>
            <div className="space-y-6">
              <BlurFade delay={0.1} inView>
                <p className="text-xs tracking-widest uppercase text-primary font-semibold">
                  Signature Item
                </p>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Cookie Pie
                </h2>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our famous Cookie Pie is a warm, gooey, giant cookie baked fresh to order.
                  Perfect for sharing (or not!). Available in multiple flavors with optional
                  ice cream on top.
                </p>
              </BlurFade>
              <BlurFade delay={0.4} inView>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="rounded-full" onClick={() => setDeliveryModalOpen(true)}>
                    Order Cookie Pie
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full">
                    See All Flavors
                  </Button>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <AppDownloadSection />

      {/* Treats Truck Section */}
      <TreatsTruckSection />

      {/* Book Promo Section */}
      <BookPromoSection />

      {/* Promotional Features / Rewards */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.2} inView>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Join Katherine's Rewards®
              </h2>
              <p className="text-lg opacity-90">
                Stack up points on every purchase to pay for future orders, or redeem for
                free treats and prizes. Opt in to start earning today!
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-8 h-12 text-base font-semibold"
                onClick={() => setRegisterModalOpen(true)}
              >
                Sign Up for Rewards
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Modals */}
      <DeliveryModal open={deliveryModalOpen} onOpenChange={setDeliveryModalOpen} />
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onSwitchToRegister={() => {
          setLoginModalOpen(false)
          setRegisterModalOpen(true)
        }}
      />
      <RegisterModal
        open={registerModalOpen}
        onOpenChange={setRegisterModalOpen}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false)
          setLoginModalOpen(true)
        }}
      />
      <ProductDialog
        item={selectedItem}
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
      />

      {/* Floating Cart */}
      <FloatingCart onOpen={() => setCartSheetOpen(true)} />
    </div>
  )
}
