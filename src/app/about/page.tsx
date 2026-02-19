"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Cake, Heart, Sparkles, Users, Award, ChevronRight, Quote, Star } from "lucide-react"

const values = [
  {
    title: "God First",
    description: "Our foundation is built on faith and gratitude for every ingredient and every customer.",
    icon: Heart,
  },
  {
    title: "Family is a Blessing",
    description: "We are a family legacy, and we treat our community like our own kin.",
    icon: Users,
  },
  {
    title: "Quality Uncompromised",
    description: "Quality should never be compromised. We use only the finest organic standards.",
    icon: Star,
  },
  {
    title: "Every Cake a Blessing",
    description: "We believe every cake can be a blessing, crafted to nourish both soul and body.",
    icon: Sparkles,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                <Heart className="h-4 w-4 fill-white" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">The A Cake</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                The Heart Behind <br />
                <span className="text-accent italic font-serif normal-case tracking-normal">The Bake</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto">
                A Family Blessing.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-24 md:py-32 bg-white border-b border-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <BlurFade delay={0.2} inView>
              <div className="relative">
                <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=800&q=80"
                    alt="Baking with Love"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white border border-blue-50 rounded-sm shadow-2xl p-8 max-w-[320px]">
                  <Quote className="h-10 w-10 mb-4 text-accent opacity-50" />
                  <p className="text-sm font-black text-primary uppercase tracking-widest leading-loose italic text-center">
                    Abraham&apos;s Delight — A Blessing in Every Slice.
                  </p>
                </div>
              </div>
            </BlurFade>

            <div className="space-y-10">
              <BlurFade delay={0.1} inView>
                <div className="inline-block px-4 py-2 bg-blue-50 text-primary rounded-sm">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Legacy</span>
                </div>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-tight">
                  Abraham&apos;s <br />
                  <span className="text-accent italic font-serif normal-case tracking-normal">Delight</span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <div className="space-y-6 text-primary/70 leading-relaxed font-medium text-lg">
                  <p>
                    The A Cake is more than a business; it&apos;s a family legacy. Our founder, Abraham, spent years perfecting recipes that weren&apos;t just delicious, but were safe for our children, friends and community.
                  </p>
                  <p>
                    Every ingredient is scrutinized to ensure it meets our strict organic standards, bringing you treats that nourish the soul as much as the body. We believe in the purity of ingredients and the power of a shared blessing.
                  </p>
                </div>
              </BlurFade>
              <BlurFade delay={0.4} inView className="pt-4">
                <Link href="/menu">
                  <Button size="lg" className="rounded-sm h-16 px-12 text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl">
                    Order a Blessing
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-blue-50/10">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4">
                Our Core Beliefs
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
          </BlurFade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <BlurFade key={value.title} delay={0.1 + index * 0.1} inView>
                <div className="text-center space-y-6 bg-white p-10 rounded-sm border border-blue-50 shadow-sm transition-all hover:shadow-xl">
                  <div className="h-16 w-16 mx-auto rounded-sm bg-blue-50 flex items-center justify-center border border-blue-100/50">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest leading-loose">{value.title}</h3>
                  <p className="text-[10px] font-medium text-primary/60 leading-relaxed">{value.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.2} inView>
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
                Abraham&apos;s <span className="text-accent italic font-serif normal-case tracking-normal">Delight</span>
              </h2>
              <p className="text-xl text-white/80 font-medium">
                Abraham&apos;s Delight — A Blessing in Every Slice.
              </p>
              <div className="pt-8">
                <Link href="/menu">
                  <Button
                    size="lg"
                    className="rounded-sm px-12 h-16 text-sm font-black uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl"
                  >
                    Experience the Blessing
                  </Button>
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  )
}
