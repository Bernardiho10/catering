
"use client"

import { useState } from "react"
import { MenuItem } from "../types"
import { MenuItemCard } from "./MenuItemCard"
import { ProductDialog } from "./ProductDialog"
import { motion } from "framer-motion"
import { FollowerPointerCard } from "@/components/magicui/follower-pointer"

interface MenuGridProps {
    items: MenuItem[]
}

export function MenuGrid({ items }: MenuGridProps) {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleItemClick = (item: MenuItem) => {
        setSelectedItem(item)
        setDialogOpen(true)
    }

    if (items.length === 0) {
        return <div className="text-center p-8 text-muted-foreground">No menu items found.</div>
    }

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                        }}
                    >
                        <FollowerPointerCard title={
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-black">View Dish</span>
                            </div>
                        }>
                            <MenuItemCard item={item} onClick={handleItemClick} />
                        </FollowerPointerCard>
                    </motion.div>
                ))}
            </motion.div>

            <ProductDialog
                item={selectedItem}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </>
    )
}
