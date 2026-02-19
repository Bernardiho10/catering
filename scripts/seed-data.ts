import { createClient } from '@supabase/supabase-js'
import { MOCK_MENU_ITEMS } from '../src/lib/mock-data'
import * as dotenv from 'dotenv'
import path from 'path'

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
    console.log('Seeding menu items...')

    for (const item of MOCK_MENU_ITEMS) {
        const { id, seasonal, benefits, ...rest } = item

        const upsertData = {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image_url: item.image_url,
            images: item.images,
            active: item.active,
            rating: item.rating,
            review_count: item.review_count,
            prep_time: item.prep_time,
            serves: item.serves,
            calories: item.calories,
            featured: item.featured,
            seasonal: seasonal || null,
            benefits: benefits || [],
            dietary_tags: item.dietary_tags
        }

        const { error } = await supabase
            .from('menu_items')
            .upsert(upsertData, { onConflict: 'name' })

        if (error) {
            console.error(`Error seeding ${item.name}:`, error)
        } else {
            console.log(`Seeded ${item.name}`)
        }
    }

    console.log('Seeding complete!')
}

seed().catch(console.error)
