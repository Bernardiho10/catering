
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowRight, Package } from "lucide-react"

export default async function OrdersPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 space-y-8">
                <div className="flex flex-col gap-2 text-left">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">Foody</p>
                    <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-foreground leading-tight">Your Orders</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        We couldn’t load your orders right now. Please try again in a moment.
                    </p>
                </div>

                <Card className="rounded-2xl">
                    <CardContent className="py-14 flex flex-col items-center text-center">
                        <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center border border-border">
                            <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h2 className="mt-4 font-heading font-semibold text-xl">Temporarily unavailable</h2>
                        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                            If this keeps happening, make sure you’re signed in and your account has access to orders.
                        </p>
                        <div className="mt-6 flex w-full flex-col sm:flex-row gap-3 sm:justify-center">
                            <Button asChild className="rounded-full" variant="outline">
                                <Link href="/">Back to menu</Link>
                            </Button>
                            <Button asChild className="rounded-full">
                                <Link href="/login">Sign in</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const statusVariant = (status: string) => {
        if (status === "delivered") return "secondary"
        if (status === "cancelled") return "destructive"
        return "default"
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 space-y-8">
            <div className="flex flex-col gap-2">
                <p className="text-xs tracking-widest uppercase text-muted-foreground">Foody</p>
                <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-foreground leading-tight">Your Orders</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Track catering deliveries, view receipts, and reorder favorites.
                </p>
            </div>

            <Card className="border-primary/15 bg-primary/5 rounded-2xl">
                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <CardTitle className="font-heading tracking-wide">Order FOO-0001</CardTitle>
                        <Badge className="bg-primary text-primary-foreground">Demo</Badge>
                    </div>
                    <CardDescription>A guided preview of the tracking experience.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full rounded-full" variant="outline">
                        <Link href="/tracking/FOO-0001?celebrate=1">
                            Open Tracking
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {orders?.length === 0 ? (
                <Card className="rounded-2xl">
                    <CardContent className="py-14 flex flex-col items-center text-center">
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="mt-4 font-heading font-semibold text-xl">No orders yet</h2>
                        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                            Once you place an order, you’ll be able to track delivery and reorder in one tap.
                        </p>
                        <Button asChild className="mt-6 rounded-full">
                            <Link href="/">Browse Catering Menu</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders?.map((order) => (
                        <Card key={order.id} className="rounded-2xl overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <CardTitle className="truncate">Order #{order.id.slice(0, 8)}</CardTitle>
                                        <CardDescription>{format(new Date(order.created_at), "PPP p")}</CardDescription>
                                    </div>
                                    <Badge variant={statusVariant(order.status)} className="capitalize">
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Total</span>
                                    <span className="font-semibold text-foreground">{formatCurrency(order.total_amount)}</span>
                                </div>
                                <Button asChild className="w-full rounded-full" variant="outline">
                                    <Link href={`/orders/${order.id}`}>
                                        View Details & Track
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
