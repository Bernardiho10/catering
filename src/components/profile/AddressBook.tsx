"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Plus, Home, Briefcase, Trash2, Edit2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const ADDRESSES = [
    {
        id: 1,
        name: "Home",
        address: "123 Maple Street",
        city: "Austin, TX 78701",
        type: "Home",
        isDefault: true,
        icon: Home
    },
    {
        id: 2,
        name: "Office",
        address: "4500 Tech Blvd, Suite 200",
        city: "Austin, TX 78759",
        type: "Work",
        isDefault: false,
        icon: Briefcase
    }
]

export default function AddressBook() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading">Address Book</h2>
                    <p className="text-muted-foreground">Manage your saved delivery locations.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add New Address
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                            <DialogDescription>
                                Add a new delivery location to your address book.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" placeholder="e.g. Home, Work" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-right">Address</Label>
                                <Input id="address" placeholder="123 Cookie Lane" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="city" className="text-right">City/Zip</Label>
                                <Input id="city" placeholder="Austin, TX 78701" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save Address</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {ADDRESSES.map((addr, index) => (
                    <motion.div
                        key={addr.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="relative overflow-hidden group">
                            {addr.isDefault && (
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-current" /> Default
                                </div>
                            )}
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <addr.icon className="h-5 w-5 text-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{addr.name}</h3>
                                        <Badge variant="outline" className="mt-1">{addr.type}</Badge>
                                    </div>
                                </div>

                                <div className="space-y-1 text-muted-foreground mb-6">
                                    <p>{addr.address}</p>
                                    <p>{addr.city}</p>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Edit2 className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
