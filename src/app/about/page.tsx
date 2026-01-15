"use client"

import { motion } from "framer-motion"
import { Heart, Award, Users, Leaf, Clock, ChefHat, Truck, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const TIMELINE_EVENTS = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Started from a small home kitchen with a passion for bringing restaurant-quality meals to busy families. Our founder began delivering homemade meals to neighbors and friends.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop"
  },
  {
    year: "2019",
    title: "First Commercial Kitchen",
    description: "Expanded to our first commercial kitchen space, allowing us to serve more customers while maintaining the quality and care of homemade cooking.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop"
  },
  {
    year: "2020",
    title: "Pivoting During Challenges",
    description: "When the world changed, we adapted. We expanded our delivery radius and introduced contactless delivery, bringing comfort food to families when they needed it most.",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=400&fit=crop"
  },
  {
    year: "2021",
    title: "Catering Launch",
    description: "Launched our full catering services for corporate events, weddings, and private parties. Our team grew to include dedicated catering specialists.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop"
  },
  {
    year: "2022",
    title: "Expanding Our Reach",
    description: "Opened our second kitchen location and doubled our delivery team. Introduced our loyalty rewards program to thank our amazing customers.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
  },
  {
    year: "2023",
    title: "Award Recognition",
    description: "Named 'Best Catering Service' by the local food critics. Launched our corporate gifting program and premium catering packages.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
  },
  {
    year: "2024",
    title: "Today & Beyond",
    description: "Serving thousands of happy customers weekly. Continuing to expand while staying true to our roots: fresh ingredients, made with love, delivered warm.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop"
  }
]

const VALUES = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source locally whenever possible, using only the freshest seasonal ingredients in every dish."
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every meal is prepared with the same care and attention we'd give to our own family."
  },
  {
    icon: Truck,
    title: "Delivered Warm",
    description: "Our insulated delivery system ensures your food arrives at the perfect temperature."
  },
  {
    icon: Users,
    title: "Community First",
    description: "We're proud to support local farmers, suppliers, and community organizations."
  }
]

const STATS = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "100+", label: "Menu Items" },
  { value: "15", label: "Team Members" },
  { value: "99%", label: "Satisfaction Rate" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-amber-50/20 to-background dark:from-background dark:via-amber-950/10 dark:to-background">
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
              <Heart className="h-4 w-4" />
              Our Story
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              From Our Kitchen <span className="text-golden">to Your Table</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What started as a passion for homemade cooking has grown into a mission to bring exceptional food experiences to every table we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop"
                  alt="Our founder in the kitchen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                <ChefHat className="h-8 w-8 mb-2" />
                <p className="font-semibold">Est. 2018</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
                A Dream Born in the Kitchen
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hi, I'm Katherine, the founder of Foody. My journey began in 2018 when I was juggling a busy career while trying to cook healthy, delicious meals for my family. I realized that so many families faced the same struggle—wanting quality food without sacrificing precious time.
                </p>
                <p>
                  What started as cooking for a few neighbors quickly grew into something more. Word spread about our homemade meals, and soon I was delivering to families across the neighborhood. That's when I knew: this wasn't just about food—it was about bringing people together around the table.
                </p>
                <p>
                  Today, our team shares that same passion. Every dish we create is made with the same love and attention I put into those first meals. Whether you're planning a corporate event, celebrating a milestone, or simply want a night off from cooking, we're here to make it special.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-primary flex items-center justify-center text-white font-heading text-2xl font-bold">
                  K
                </div>
                <div>
                  <p className="font-semibold text-foreground">Katherine Martinez</p>
                  <p className="text-sm text-muted-foreground">Founder & Head Chef</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to serving thousands of customers, here's how we've grown.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-2">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </div>

                {/* Image (hidden on mobile) */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]">
                  <div className={`aspect-video rounded-2xl overflow-hidden ${index % 2 === 0 ? "ml-8" : "mr-8"}`}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do, from sourcing ingredients to delivering your order.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you're planning an event or just want a delicious meal delivered, we're here to serve you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#menu">
                <Button size="lg" className="rounded-full gap-2">
                  <Leaf className="h-4 w-4" />
                  View Our Menu
                </Button>
              </Link>
              <Link href="/catering">
                <Button size="lg" variant="outline" className="rounded-full gap-2">
                  <Users className="h-4 w-4" />
                  Explore Catering
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
