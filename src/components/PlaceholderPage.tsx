import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="container mx-auto px-4 py-32 min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8">
            <div className="h-20 w-20 rounded-sm bg-blue-50 flex items-center justify-center border border-blue-100/50 text-primary">
                <Sparkles className="h-10 w-10" />
            </div>
            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">{title}</h1>
                <p className="text-lg text-primary/60 font-medium max-w-xl mx-auto leading-relaxed italic">
                    This page is currently being prepared with love and organic ingredients.
                    Check back soon to experience the full blessing.
                </p>
            </div>
            <Button asChild className="rounded-sm h-14 px-8 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest text-xs shadow-xl">
                <Link href="/">
                    <ArrowLeft className="mr-3 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
    )
}
