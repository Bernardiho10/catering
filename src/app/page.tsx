"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DeliveryModal } from "@/components/modals/DeliveryModal"
import { LoginModal, RegisterModal } from "@/components/modals/AuthModals"
import { OccasionCategories } from "@/components/sections/OccasionCategories"
import { HeroCarousel } from "@/components/sections/HeroCarousel"
import { AnnouncementBar } from "@/components/sections/AnnouncementBar"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, RotateCcw, Users, Star, Flame, Heart, Sparkles, ChevronRight, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { ProductDialog } from "@/features/menu/components/ProductDialog"
import { MenuItem } from "@/features/menu/types"
import { WarmMoments } from "@/components/sections/WarmMoments"
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Hero Carousel */}
      <HeroCarousel onOrderClick={() => setDeliveryModalOpen(true)} />

      {/* Quick Action Buttons - Styled like Cookiedelivery */}
      <section className="py-12 bg-white border-b border-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-2 h-auto py-4 px-8 text-primary hover:text-accent hover:bg-transparent"
              onClick={() => setDeliveryModalOpen(true)}
            >
              <Gift className="h-8 w-8 text-accent" />
              <span className="font-black uppercase tracking-widest text-xs">Gift Cards</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-2 h-auto py-4 px-8 text-primary hover:text-accent hover:bg-transparent"
            >
              <Truck className="h-8 w-8 text-primary" />
              <span className="font-black uppercase tracking-widest text-xs">Bulk Orders</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-2 h-auto py-4 px-8 text-primary hover:text-accent hover:bg-transparent"
            >
              <Users className="h-8 w-8 text-primary" />
              <span className="font-black uppercase tracking-widest text-xs">Group Gifts</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Occasion Categories */}
      <OccasionCategories />

      {/* Our Promise Section */}
      <section className="py-24 bg-blue-50/10 border-y border-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-sm">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Our Promise</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter">
                At The A Cake, we don&apos;t just bake; <br />
                <span className="text-accent italic font-serif normal-case tracking-normal">We Care.</span>
              </h2>
              <p className="text-xl md:text-2xl text-primary/70 leading-relaxed font-medium">
                At The A Cake, we don&apos;t just bake; we care. From our family to yours, we use only the highest quality organic ingredients, free from artificial preservatives and synthetic additives. We believe that what you put in your body matters, and that starts with the purity of the ingredients used in our kitchen. Whether it&apos;s the rich, organic cocoa in our chocolate cakes or the hand-pressed citrus in our lemon varieties, you can taste the difference that honest, organic baking makes.
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="outline" className="rounded-sm border-2 border-primary text-primary px-10 h-14 font-black uppercase tracking-widest hover:bg-primary/5">
                    The Heart Behind the Bake
                  </Button>
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4">
                Our Signature Blessings
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            </div>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {bestSellers.map((item, index) => (
              <BlurFade key={item.id} delay={0.1 + index * 0.1} inView>
                <div
                  className="group cursor-pointer space-y-4"
                  onClick={() => handleProductClick(item)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-sm bg-blue-50 border border-blue-100">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/menu">
              <Button className="rounded-sm bg-primary hover:bg-primary/90 px-12 h-16 text-sm font-black uppercase tracking-widest shadow-xl">
                Browse Our Flavors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nursing Mother's Special Section */}
      <section className="py-24 border-y border-blue-50 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <BlurFade delay={0.2} inView>
              <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
                  alt="Nursing Mother's Special"
                  fill
                  className="object-cover"
                />
              </div>
            </BlurFade>
            <div className="space-y-8">
              <BlurFade delay={0.1} inView>
                <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
                  Abraham&apos;s <br />
                  <span className="text-accent italic font-serif normal-case tracking-normal">Specialty</span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-primary uppercase tracking-widest">The Nursing Mother&apos;s Special</h3>
                  <p className="text-lg text-primary/70 leading-relaxed font-medium">
                    Our signature recipe. Crafted with specific organic ingredients known to support lactation, offering a delicious, nutrient-dense treat for new moms.
                  </p>
                </div>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <Link href="/menu">
                  <Button
                    size="lg"
                    className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl"
                  >
                    Bring a Blessing Home
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-24 bg-blue-50/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <BlurFade delay={0.2} inView>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex justify-center mb-8">
                <Star className="h-16 w-16 text-accent fill-accent" />
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-primary uppercase tracking-tighter">
                Abraham&apos;s Rewards
              </h2>
              <p className="text-xl text-primary/60 font-medium leading-relaxed">
                Join our family! Earn points with every organic blessing you purchase. Redeem points for free cakes, exclusive tastings, and special family bundles.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="rounded-sm px-12 h-16 text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl"
                  onClick={() => setRegisterModalOpen(true)}
                >
                  Join the Family
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Warm Moments */}
      <WarmMoments />

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
