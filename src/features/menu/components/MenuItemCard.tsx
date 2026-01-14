"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MenuItem } from "../types"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { Clock, Star, Users, Flame } from "lucide-react"

export function MenuItemCard({ item, onClick }: { item: MenuItem; onClick: (item: MenuItem) => void }) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Card
                className="group overflow-hidden flex flex-col h-full bg-card border border-border hover:border-primary/30 cursor-pointer transition-all duration-300 rounded-2xl hover:shadow-lg"
                onClick={() => onClick(item)}
            >
                <div className="relative h-52 w-full overflow-hidden bg-muted">
                    <Image
                        src={item.image_url || '/placeholder-food.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {item.featured && (
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            Popular
                        </div>
                    )}
                    {item.seasonal && (
                        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                            {item.seasonal}
                        </div>
                    )}
                </div>

                <CardContent className="flex-1 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                            {item.name}
                        </h3>
                        <span className="text-lg font-semibold text-primary shrink-0">
                            {formatCurrency(item.price)}
                        </span>
                    </div>

                    {item.rating && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-medium text-foreground">{item.rating}</span>
                            </div>
                            {item.review_count && (
                                <span className="text-xs text-muted-foreground">
                                    ({item.review_count} reviews)
                                </span>
                            )}
                        </div>
                    )}
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                        {item.prep_time && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{item.prep_time} min</span>
                            </div>
                        )}
                        {item.serves && (
                            <div className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                <span>Serves {item.serves}</span>
                            </div>
                        )}
                        {item.calories && (
                            <span className="ml-auto">{item.calories} cal</span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {item.dietary_tags.slice(0, 2).map(tag => (
                            <span 
                                key={tag} 
                                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full capitalize"
                            >
                                {tag}
                            </span>
                        ))}
                        {item.benefits?.slice(0, 1).map(benefit => (
                            <span 
                                key={benefit} 
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize"
                            >
                                {benefit}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
