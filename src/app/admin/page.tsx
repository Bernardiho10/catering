"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, ShieldCheck, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface DailyDish {
    id: number;
    name: string;
    sold_out: boolean;
}

export default function AdminPage() {
    const [todaysDishes, setTodaysDishes] = useState<DailyDish[]>([]);
    const [newDish, setNewDish] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const fetchDishes = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('daily_menu')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setTodaysDishes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    const addDish = async () => {
        if (newDish.trim()) {
            const { error } = await supabase
                .from('daily_menu')
                .insert([{ name: newDish, sold_out: false }]);

            if (!error) {
                setNewDish("");
                fetchDishes();
            } else {
                toast.error("Unable to add dish. Please check your permissions.");
            }
        }
    };

    const toggleSoldOut = async (id: number, currentStatus: boolean) => {
        const { error } = await supabase
            .from('daily_menu')
            .update({ sold_out: !currentStatus })
            .eq('id', id);

        if (!error) fetchDishes();
    };

    const removeDish = async (id: number) => {
        const { error } = await supabase
            .from('daily_menu')
            .delete()
            .eq('id', id);

        if (!error) fetchDishes();
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUserEmail(user?.email ?? null);

            if (!user) {
                setIsAdmin(false);
                return;
            }

            const { data: dbUser } = await supabase
                .from("users")
                .select("role")
                .eq("id", user.id)
                .maybeSingle<{ role: string | null }>();

            setIsAdmin(dbUser?.role === "admin");
        };
        checkUser();
        fetchDishes();
    }, []);

    const markAllSoldOut = async () => {
        const { error } = await supabase
            .from("daily_menu")
            .update({ sold_out: true })
            .eq("sold_out", false);

        if (error) {
            toast.error("Unable to mark all dishes as sold out.");
            return;
        }

        toast.success("All dishes marked as sold out.");
        fetchDishes();
    };

    if (!userEmail) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
                    <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="mt-5 text-2xl font-heading font-semibold text-foreground">Admin access</h1>
                    <p className="mt-2 text-muted-foreground">Sign in to curate today’s menu for Foody.</p>
                    <Button onClick={() => router.push('/login')} className="mt-6 rounded-full" variant="outline">
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
                    <div className="mx-auto h-14 w-14 rounded-2xl bg-muted flex items-center justify-center border border-border">
                        <ShieldCheck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h1 className="mt-5 text-2xl font-heading font-semibold text-foreground">Admin only</h1>
                    <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                        Your account doesn’t have permission to manage today’s menu.
                    </p>
                    <Button onClick={() => router.push('/')} className="mt-6 rounded-full" variant="outline">
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 space-y-8 max-w-5xl">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs tracking-widest uppercase text-muted-foreground">Foody Admin</p>
                            <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-foreground leading-tight">
                                Today’s Menu
                            </h1>
                        </div>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Add dishes, mark items sold out, and keep today’s catering lineup fresh.
                    </p>
                    <p className="text-xs text-muted-foreground">Signed in as: {userEmail}</p>
                </div>

                <div className="grid gap-6">
                    <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-border bg-muted/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-heading font-semibold text-foreground">Edit Today’s Dishes</h2>
                                <p className="text-sm text-muted-foreground">These appear in Today’s Highlights and the menu.</p>
                            </div>
                            <Button
                                onClick={markAllSoldOut}
                                variant="outline"
                                className="rounded-full border-red-500/30 text-red-600 hover:text-red-600 hover:bg-red-500/10"
                            >
                                Mark all sold out
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    placeholder="Add a new dish (e.g., Sesame Chicken Bowl)…"
                                    value={newDish}
                                    onChange={(e) => setNewDish(e.target.value)}
                                    className="rounded-full"
                                />
                                <Button onClick={addDish} className="rounded-full">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add dish
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {loading ? (
                                    <div className="flex justify-center py-10">
                                        <Loader2 className="animate-spin text-primary" />
                                    </div>
                                ) : todaysDishes.map((dish) => (
                                    <motion.div
                                        key={dish.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-background"
                                    >
                                        <div className="min-w-0">
                                            <p className={`font-medium truncate ${dish.sold_out ? "text-muted-foreground line-through" : "text-foreground"}`}>
                                                {dish.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {dish.sold_out ? "Hidden from today’s available list" : "Available"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => toggleSoldOut(dish.id, dish.sold_out)}
                                                className={
                                                    dish.sold_out
                                                        ? "rounded-full border-red-500/30 text-red-600 hover:bg-red-500/10"
                                                        : "rounded-full"
                                                }
                                            >
                                                {dish.sold_out ? "Sold out" : "Mark sold out"}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeDish(dish.id)}
                                                className="rounded-full text-muted-foreground hover:text-red-600"
                                                aria-label="Remove dish"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                                {!loading && todaysDishes.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-muted-foreground">No dishes added yet.</p>
                                        <p className="text-sm text-muted-foreground">Add your first dish above to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
