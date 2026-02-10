
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-heading font-bold mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                This page is currently under development. Please check back soon for updates.
            </p>
            <Button asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
    )
}
