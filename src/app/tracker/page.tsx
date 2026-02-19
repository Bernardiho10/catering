import OrderTracker from "@/components/orders/OrderTracker"
import { Metadata } from "next"
import { Suspense } from "react"
import { RefreshCw, MapPin } from "lucide-react"

export const metadata: Metadata = {
    title: "Track Your Order | Abraham's Organic Treats",
    description: "Real-time status of your delivery.",
}

export default function TrackerPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Area */}
            <section className="bg-primary pt-24 pb-12 text-white">
                <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                        <MapPin className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-Time Logistics</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Track Your <span className="text-accent italic font-serif normal-case tracking-normal">Blessing</span></h1>
                    <p className="text-white/60 font-medium max-w-md mx-auto">Enter your order ID or check your email for the live tracking link.</p>
                </div>
            </section>

            {/* Tracker Component Area */}
            <div className="container mx-auto py-16 px-4">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-12 bg-blue-50/10 rounded-sm border border-blue-50">
                        <RefreshCw className="w-10 h-10 animate-spin text-primary" />
                        <div className="space-y-2 text-center">
                            <p className="text-sm font-black text-primary uppercase tracking-widest leading-loose">Locating Your Treats</p>
                            <p className="text-[10px] font-medium text-primary/40 uppercase tracking-widest">Warming the oven & syncing GPS...</p>
                        </div>
                    </div>
                }>
                    <OrderTracker />
                </Suspense>
            </div>

            {/* Help Strip */}
            <section className="py-12 bg-blue-50/10 border-t border-blue-50">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">
                        Need immediate assistance? Call <span className="text-primary">(555) 123-4567</span>
                    </p>
                </div>
            </section>
        </div>
    )
}
