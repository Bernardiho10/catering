
export interface MenuItem {
    id: string
    name: string
    description: string
    price: number // in cents
    category: string
    image_url: string
    images: string[]
    active: boolean
    dietary_tags: string[]
    rating?: number
    review_count?: number
    prep_time?: number
    serves?: number
    calories?: number
    featured?: boolean
    seasonal?: string
    benefits?: string[]
}

export type CartItem = MenuItem & {
    quantity: number
    options?: Record<string, any>
}
