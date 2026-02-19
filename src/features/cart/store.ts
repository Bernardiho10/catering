
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
    shippingDate: string | null
    senderInfo: {
        firstName: string
        lastName: string
        email: string
        phone: string
    } | null
    recipientInfo: {
        name: string
        address: string
        instructions: string
    } | null
    giftInfo: {
        message: string
        isGiftWrapped: boolean
    } | null
    setDeliveryAddress: (input: {
        addressLine1: string
        city: string
        state: string
        postalCode: string
        country: string
    }) => void
    setFullAddress: (address: string) => void
    setOrderType: (type: "delivery" | "pickup") => void
    setCheckoutInfo: (info: Partial<Pick<CartStore, 'shippingDate' | 'senderInfo' | 'recipientInfo' | 'giftInfo'>>) => void
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
            shippingDate: null,
            senderInfo: null,
            recipientInfo: null,
            giftInfo: null,
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
            setCheckoutInfo: (info) => set((state) => ({ ...state, ...info })),
            clearDeliveryAddress: () => set({
                deliveryAddress: null,
                fullAddress: null,
                orderType: null,
                deliveryZoneId: null,
                deliveryFeeCents: 0,
                shippingDate: null,
                senderInfo: null,
                recipientInfo: null,
                giftInfo: null
            }),
        }),
        {
            name: 'katherine-cart-storage',
            storage: createJSONStorage(() => ({
                getItem: async (name: string): Promise<string | null> => {
                    if (typeof window === 'undefined') return null;
                    try {
                        const { getCartFromDB } = await import('@/lib/db');
                        const items = await getCartFromDB();
                        if (!items || items.length === 0) return localStorage.getItem(name);

                        return JSON.stringify({
                            state: {
                                items: items,
                                total: items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0),
                                deliveryAddress: null,
                                fullAddress: null,
                                orderType: null,
                                deliveryZoneId: null,
                                deliveryFeeCents: 0
                            },
                            version: 0
                        });
                    } catch (e) {
                        return localStorage.getItem(name);
                    }
                },
                setItem: async (name: string, value: string) => {
                    if (typeof window === 'undefined') return;
                    localStorage.setItem(name, value);

                    try {
                        const { saveCartToDB } = await import('@/lib/db');
                        const parsed = JSON.parse(value);
                        if (parsed.state && parsed.state.items) {
                            await saveCartToDB(parsed.state.items);
                        }
                    } catch (e) {
                        console.error("Failed to save to IDB", e);
                    }
                },
                removeItem: async (name: string) => {
                    localStorage.removeItem(name);
                },
            })),
            skipHydration: true,
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
                }
            }
        }
    )
)

function calculateTotal(items: CartItem[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Hydrate on mount
if (typeof window !== 'undefined') {
    useCartStore.persist.rehydrate()
}
