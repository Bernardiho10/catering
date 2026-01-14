"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MenuItem } from "../types"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

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
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <Image
                        src={item.image_url || '/placeholder-food.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <CardContent className="flex-1 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                        <span className="text-lg font-semibold text-primary shrink-0">
                            {formatCurrency(item.price)}
                        </span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                        {item.dietary_tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                                {item.dietary_tags.slice(0, 2).map(tag => (
                                    <span 
                                        key={tag} 
                                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                            <Clock className="h-3 w-3" />
                            <span>25 min</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
