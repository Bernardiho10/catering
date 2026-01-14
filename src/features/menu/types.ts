
export interface MenuItem {
    id: string
    name: string
    description: string
    price: number // in cents
    category: string
    image_url: string
    images: string[] // New: Array of images for gallery
    active: boolean
    dietary_tags: string[]
}

export type CartItem = MenuItem & {
    quantity: number
    options?: Record<string, any>
}
