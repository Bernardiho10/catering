"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Cookie, Heart, Sparkles, Users, MapPin, Award, ChevronRight, Quote, Star, BookOpen } from "lucide-react"

const milestones = [
  {
    year: "1999",
    title: "The Beginning",
    description: "Tiff bakes her first batch of cookies as an apology to Leon for missing a date. The rest is history.",
    icon: Heart,
    color: "#ec4899",
  },
  {
    year: "2003",
    title: "First Store Opens",
    description: "After delivering cookies from dorm rooms and apartments, Tiff's Treats opens its first official storefront in Austin, Texas.",
    icon: MapPin,
    color: "#c41e3a",
  },
  {
    year: "2008",
    title: "Expansion Begins",
    description: "With multiple locations in Austin thriving, Tiff's Treats begins planning expansion to other Texas cities.",
    icon: Sparkles,
    color: "#f59e0b",
  },
  {
    year: "2012",
    title: "Dallas & Houston",
    description: "Tiff's Treats brings warm cookies to Dallas and Houston, becoming a Texas-wide phenomenon.",
    icon: Cookie,
    color: "#8b5cf6",
  },
  {
    year: "2018",
    title: "Beyond Texas",
    description: "The company expands nationally, bringing warm cookie delivery to cities across the United States.",
    icon: Award,
    color: "#10b981",
  },
  {
    year: "2024",
    title: "Our Book Launches",
    description: "'It's Not Just Cookies' tells our story and shares some of our favorite recipes with fans everywhere.",
    icon: BookOpen,
    color: "#c41e3a",
  },
]

const values = [
  {
    title: "Warmth in Every Cookie",
    description: "Every cookie is baked fresh and delivered warm. It's not just about the taste—it's about the feeling.",
    icon: Cookie,
  },
  {
    title: "Creating Moments",
    description: "We're not just delivering cookies. We're helping people create warm moments and memories.",
    icon: Heart,
  },
  {
    title: "Community First",
    description: "From our team members to our customers, we believe in building genuine connections.",
    icon: Users,
  },
  {
    title: "Excellence Always",
    description: "We never compromise on quality. Every ingredient, every recipe, every delivery matters.",
    icon: Star,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#c41e3a] via-[#a31830] to-[#8b1528] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <BlurFade delay={0.1} inView>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20">
                <Heart className="h-4 w-4" fill="currentColor" />
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Warm Moments<br />Delivered®
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                What started with one batch of cookies to say "I'm sorry"
                has grown into a company delivering millions of warm moments every year.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <BlurFade delay={0.2} inView>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
                    alt="Tiffany and Leon Chen - Founders"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating Quote */}
                <div className="absolute -bottom-6 -right-6 md:right-6 bg-[#c41e3a] text-white rounded-2xl shadow-xl p-6 max-w-[280px]">
                  <Quote className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm italic">
                    "The best apology I ever made turned into the best decision of our lives."
                  </p>
                  <p className="text-xs mt-2 opacity-80">— Tiffany Chen</p>
                </div>
              </div>
            </BlurFade>

            <div className="space-y-6">
              <BlurFade delay={0.1} inView>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[#c41e3a]/10 text-[#c41e3a]">
                  How It All Started
                </span>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  A Cookie Apology That Changed Everything
                </h2>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In 1999, college student Tiffany Taylor (now Chen) stood up her boyfriend
                    Leon for a date. Her apology? A batch of fresh-baked chocolate chip cookies
                    delivered to his door—still warm.
                  </p>
                  <p>
                    Leon was so impressed that he suggested Tiff should start a business.
                    She laughed it off at first, but the seed was planted. What started as
                    an entrepreneurial experiment from their apartment quickly grew into
                    something much bigger.
                  </p>
                  <p>
                    Today, Tiff's Treats delivers millions of warm cookies each year,
                    helping people across the country create their own warm moments.
                  </p>
                </div>
              </BlurFade>
              <BlurFade delay={0.4} inView>
                <Link href="/menu">
                  <Button size="lg" className="rounded-full bg-[#c41e3a] hover:bg-[#a31830]">
                    Order Your Warm Moment
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-red-950/30">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[#c41e3a]/10 text-[#c41e3a] mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                25 Years of Warm Moments
              </h2>
            </div>
          </BlurFade>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#c41e3a]/20 -translate-x-1/2 hidden lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <BlurFade key={milestone.year} delay={0.1 + index * 0.1} inView>
                  <div className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:py-12 ${index % 2 === 0 ? '' : 'lg:direction-rtl'}`}>
                    <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12'}`}>
                      <div className={`bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-border relative ${index % 2 === 0 ? '' : 'lg:direction-ltr'}`}>
                        {/* Year Badge */}
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-bold mb-3"
                          style={{ backgroundColor: milestone.color }}
                        >
                          <milestone.icon className="h-4 w-4" />
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>

                        {/* Timeline Dot - Desktop */}
                        <div
                          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg ${index % 2 === 0 ? '-right-[calc(1.5rem+2px)]' : '-left-[calc(1.5rem+2px)]'}`}
                          style={{ backgroundColor: milestone.color }}
                        />
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[#c41e3a]/10 text-[#c41e3a] mb-4">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Values
              </h2>
            </div>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <BlurFade key={value.title} delay={0.1 + index * 0.1} inView>
                <div className="bg-muted/30 rounded-2xl p-6 text-center border border-border hover:border-[#c41e3a]/30 transition-all hover:shadow-lg group">
                  <div className="h-14 w-14 mx-auto rounded-full bg-[#c41e3a]/10 flex items-center justify-center mb-4 group-hover:bg-[#c41e3a] transition-colors">
                    <value.icon className="h-7 w-7 text-[#c41e3a] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <BlurFade delay={0.1} inView>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-500/10 text-amber-700">
                  <BookOpen className="h-4 w-4" />
                  Get the Book
                </span>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  It's Not Just Cookies!
                </h2>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The long-awaited story of how Tiffany and Leon Chen turned a batch of
                  "sorry I stood you up" cookies into a $500M warm cookie empire.
                  Includes favorite Tiff's Treats recipes!
                </p>
              </BlurFade>
              <BlurFade delay={0.4} inView>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full bg-[#c41e3a] hover:bg-[#a31830]">
                    Order the Book
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </div>
              </BlurFade>
            </div>

            <BlurFade delay={0.2} inView>
              <div className="relative order-1 lg:order-2 flex justify-center">
                <div className="relative w-[280px] md:w-[320px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transform hover:-rotate-2 transition-transform">
                  <Image
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
                    alt="It's Not Just Cookies Book"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
                {/* Best Seller Badge */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#c41e3a] rounded-full flex items-center justify-center text-white font-bold shadow-xl transform rotate-12">
                  <div className="text-center">
                    <p className="text-[10px]">BEST</p>
                    <p className="text-sm">SELLER</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-[#c41e3a] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.2} inView>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Ready for Your Warm Moment?
              </h2>
              <p className="text-lg md:text-xl text-white/90">
                Join millions of customers who've experienced the joy of warm cookies delivered to their door.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link href="/menu">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full px-10 h-14 text-base font-bold bg-white text-[#c41e3a] hover:bg-white/90 shadow-lg"
                  >
                    Order Now
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </Link>
                <Link href="/locations">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 h-14 text-base font-semibold border-2 border-white text-white hover:bg-white/10"
                  >
                    Find a Location
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
