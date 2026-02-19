import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const organicCakes = [
    {
        name: "Classic Organic Vanilla",
        description: "Our signature organic vanilla cake made with Madagascar beans.",
        price: 3200,
        category: "cakes",
        image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        active: true,
        dietary_tags: ['organic', 'vegetarian'],
        featured: true
    },
    {
        name: "Golden Honey Organic",
        description: "Sweetened with wildflower honey and made with sprouted grains.",
        price: 3500,
        category: "cakes",
        image_url: "https://images.unsplash.com/photo-1542826438-bd32f43d626f",
        active: true,
        dietary_tags: ['organic', 'natural-sweetener'],
        featured: false
    },
    {
        name: "Organic Double Chocolate",
        description: "Rich 70% dark organic chocolate cake.",
        price: 3800,
        category: "cakes",
        image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
        active: true,
        dietary_tags: ['organic', 'vegan-option'],
        featured: true
    },
    {
        name: "Blueberry Bliss Organic",
        description: "Bursting with hand-picked organic blueberries.",
        price: 3600,
        category: "cakes",
        image_url: "https://images.unsplash.com/photo-1464347744102-11db6282f854",
        active: true,
        dietary_tags: ['organic', 'berry-packed'],
        featured: false
    }
]

async function seed() {
    console.log('Seeding organic cakes...')

    const { data, error } = await supabase
        .from('menu_items')
        .upsert(organicCakes, { onConflict: 'name' })

    if (error) {
        console.error('Error seeding data:', error)
    } else {
        console.log('Successfully seeded organic cakes!')
    }
}

seed()
