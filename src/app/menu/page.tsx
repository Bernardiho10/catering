import { Suspense } from "react"
import { getMenu } from "@/app/actions/menu"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import MenuView from "@/features/menu/components/MenuView"
import { RefreshCw } from "lucide-react"

async function fetchMenuItems() {
    const result = await getMenu()
    if (!result.success || !result.data || result.data.length === 0) {
        console.warn("Using mock data due to DB error or empty table:", result.message)
        return MOCK_MENU_ITEMS
    }
    return result.data
}

export default async function MenuPage() {
    const items = await fetchMenuItems()

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <RefreshCw className="h-12 w-12 mx-auto animate-spin text-primary" />
                    <p className="text-primary/60 font-black uppercase tracking-widest text-xs">Preparing the Menu...</p>
                </div>
            </div>
        }>
            <MenuView initialItems={items} />
        </Suspense>
    )
}
