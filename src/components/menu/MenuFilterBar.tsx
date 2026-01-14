"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

interface MenuFilterBarProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    selectedDietary: string[]
    onDietaryChange: (tags: string[]) => void
    priceRange: [number, number]
    onPriceRangeChange: (range: [number, number]) => void
    maxPrice: number
}

const dietaryOptions = [
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "dairy-free", label: "Dairy-Free" },
]

export function MenuFilterBar({
    searchQuery,
    onSearchChange,
    selectedDietary,
    onDietaryChange,
    priceRange,
    onPriceRangeChange,
    maxPrice,
}: MenuFilterBarProps) {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)

    const toggleDietary = (value: string) => {
        if (selectedDietary.includes(value)) {
            onDietaryChange(selectedDietary.filter(d => d !== value))
        } else {
            onDietaryChange([...selectedDietary, value])
        }
    }

    const clearFilters = () => {
        onSearchChange("")
        onDietaryChange([])
        onPriceRangeChange([0, maxPrice])
    }

    const hasActiveFilters = searchQuery || selectedDietary.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search dishes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-11 h-12 rounded-full bg-background border-border"
                    />
                </div>

                <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                    <PopoverTrigger asChild>
                        <Button 
                            variant="outline" 
                            className="h-12 px-5 rounded-full gap-2"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                            {(selectedDietary.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                                    {selectedDietary.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="end">
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <h4 className="font-medium text-sm text-foreground">Dietary Preferences</h4>
                                <div className="flex flex-wrap gap-2">
                                    {dietaryOptions.map(option => (
                                        <Button
                                            key={option.value}
                                            variant={selectedDietary.includes(option.value) ? "default" : "outline"}
                                            size="sm"
                                            className="rounded-full text-xs h-8"
                                            onClick={() => toggleDietary(option.value)}
                                        >
                                            {option.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm text-foreground">Price Range</h4>
                                    <span className="text-xs text-muted-foreground">
                                        ${(priceRange[0] / 100).toFixed(0)} - ${(priceRange[1] / 100).toFixed(0)}
                                    </span>
                                </div>
                                <Slider
                                    value={priceRange}
                                    onValueChange={(value: number[]) => onPriceRangeChange([value[0], value[1]])}
                                    max={maxPrice}
                                    min={0}
                                    step={100}
                                    className="py-2"
                                />
                            </div>

                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="w-full text-muted-foreground"
                                onClick={clearFilters}
                            >
                                Clear all filters
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {searchQuery && (
                        <Badge variant="secondary" className="gap-1 pr-1">
                            &quot;{searchQuery}&quot;
                            <button 
                                onClick={() => onSearchChange("")}
                                className="ml-1 hover:bg-muted rounded-full p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                    {selectedDietary.map(tag => (
                        <Badge key={tag} variant="secondary" className="gap-1 pr-1 capitalize">
                            {tag}
                            <button 
                                onClick={() => toggleDietary(tag)}
                                className="ml-1 hover:bg-muted rounded-full p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                        <Badge variant="secondary" className="gap-1 pr-1">
                            ${(priceRange[0] / 100).toFixed(0)} - ${(priceRange[1] / 100).toFixed(0)}
                            <button 
                                onClick={() => onPriceRangeChange([0, maxPrice])}
                                className="ml-1 hover:bg-muted rounded-full p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-6 px-2 text-muted-foreground"
                        onClick={clearFilters}
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    )
}
