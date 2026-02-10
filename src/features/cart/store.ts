
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, MenuItem } from '@/features/menu/types'
import { determineDeliveryEligibility, type DeliveryZoneId } from '@/lib/delivery-zones'

interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem | MenuItem) => void
    removeItem: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
    total: number

    deliveryAddress: {
        addressLine1: string
        city: string
        state: string
        postalCode: string
        country: string
    } | null
    fullAddress: string | null
    orderType: "delivery" | "pickup" | null
    deliveryZoneId: DeliveryZoneId | null
    deliveryFeeCents: number
    setDeliveryAddress: (input: {
        addressLine1: string
        city: string
        state: string
        postalCode: string
        country: string
    }) => void
    setFullAddress: (address: string) => void
    setOrderType: (type: "delivery" | "pickup") => void
    clearDeliveryAddress: () => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            total: 0,
            deliveryAddress: null,
            fullAddress: null,
            orderType: null,
            deliveryZoneId: null,
            deliveryFeeCents: 0,
            addItem: (item) => {
                const currentItems = get().items
                const existingItem = currentItems.find((i) => i.id === item.id)
                const quantityToAdd = 'quantity' in item ? item.quantity : 1

                if (existingItem) {
                    const updatedItems = currentItems.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
                    )
                    set({
                        items: updatedItems,
                        total: calculateTotal(updatedItems),
                    })
                } else {
                    const newItem = { ...item, quantity: quantityToAdd }
                    const updatedItems = [...currentItems, newItem]
                    set({
                        items: updatedItems,
                        total: calculateTotal(updatedItems),
                    })
                }
            },
            removeItem: (itemId) => {
                const currentItems = get().items
                const updatedItems = currentItems.filter((i) => i.id !== itemId)
                set({
                    items: updatedItems,
                    total: calculateTotal(updatedItems),
                })
            },
            updateQuantity: (itemId, quantity) => {
                const currentItems = get().items
                let updatedItems
                if (quantity <= 0) {
                    updatedItems = currentItems.filter((i) => i.id !== itemId)
                } else {
                    updatedItems = currentItems.map((i) =>
                        i.id === itemId ? { ...i, quantity } : i
                    )
                }
                set({
                    items: updatedItems,
                    total: calculateTotal(updatedItems),
                })
            },
            clearCart: () => set({ items: [], total: 0 }),

            setDeliveryAddress: (input) => {
                const eligibility = determineDeliveryEligibility(input)
                if (!eligibility.eligible || eligibility.deliveryFeeCents === null) {
                    set({ deliveryAddress: input, deliveryZoneId: null, deliveryFeeCents: 0 })
                    return
                }

                set({
                    deliveryAddress: input,
                    deliveryZoneId: eligibility.zoneId,
                    deliveryFeeCents: eligibility.deliveryFeeCents,
                })
            },
            setFullAddress: (address) => set({ fullAddress: address }),
            setOrderType: (type) => set({ orderType: type }),
            clearDeliveryAddress: () => set({ deliveryAddress: null, fullAddress: null, orderType: null, deliveryZoneId: null, deliveryFeeCents: 0 }),
        }),
        {
            name: 'katherine-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

function calculateTotal(items: CartItem[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
}
