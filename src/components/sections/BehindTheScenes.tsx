"use client"

import { motion } from "framer-motion"
import { Play, Clock, ChefHat, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const VIDEOS = [
  {
    id: 1,
    title: "This Week's Special: Truffle Mushroom Risotto",
    description: "Watch Chef Maria craft our signature risotto with hand-foraged wild mushrooms and aged parmesan.",
    thumbnail: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=450&fit=crop",
    duration: "4:32",
    chef: "Chef Maria",
  },
  {
    id: 2,
    title: "Farm to Table: Sourcing Local Ingredients",
    description: "Follow our team as we visit local farms to hand-pick the freshest seasonal produce.",
    thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=450&fit=crop",
    duration: "6:15",
    chef: "Farm Team",
  },
  {
    id: 3,
    title: "The Art of Plating",
    description: "Discover the techniques behind our beautiful presentations that make every dish Instagram-worthy.",
    thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop",
    duration: "3:48",
    chef: "Chef Alex",
  },
]

export function BehindTheScenes() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-amber-50/50 via-background to-blue-50/30 dark:from-amber-950/20 dark:via-background dark:to-blue-950/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium border border-amber-200/50 dark:border-amber-500/20 mx-auto">
            <Play className="h-4 w-4" />
            Behind The Scenes
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-foreground">
            Watch How We <span className="text-golden">Craft Your Meals</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Step into our kitchen and discover the passion, skill, and fresh ingredients that go into every dish we prepare.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div 
              className="relative aspect-video rounded-3xl overflow-hidden bg-muted cursor-pointer group"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-20 w-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl cursor-pointer group-hover:bg-white transition-colors"
                  >
                    <Play className="h-8 w-8 text-primary fill-primary ml-1" />
                  </motion.div>
                </div>
              )}

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    This Week
                  </span>
                  <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activeVideo.duration}
                  </span>
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-heading font-semibold mb-1">
                  {activeVideo.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Video List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              More Kitchen Stories
            </h3>
            
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  setActiveVideo(video)
                  setIsPlaying(false)
                }}
                className={`flex gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                  activeVideo.id === video.id 
                    ? 'bg-primary/10 border border-primary/30' 
                    : 'bg-muted/50 hover:bg-muted border border-transparent'
                }`}
              >
                <div className="relative h-20 w-32 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-3 w-3 text-primary fill-primary ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm line-clamp-2 ${
                    activeVideo.id === video.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {video.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{video.chef}</p>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full rounded-full mt-4">
              View All Videos
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
