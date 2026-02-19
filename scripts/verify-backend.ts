import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function verify() {
    console.log('Verifying backend setup...')

    const { count: menuCount, error: menuError } = await supabase.from('menu_items').select('*', { count: 'exact', head: true })
    console.log('Menu items count:', menuCount)

    const { count: userCount, error: userError } = await supabase.from('users').select('*', { count: 'exact', head: true })
    console.log('User profiles count:', userCount)

    const { data: notifications, error: notifError } = await supabase.from('notifications').select('count', { count: 'exact', head: true })
    console.log('Notifications table exists:', !notifError)

    if (menuError || userError || notifError) {
        console.error('Verification issues:', { menuError, userError, notifError })
    }
}

verify()
