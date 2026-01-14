"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, ShieldCheck, Loader2, Sparkles, Percent, Save } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface DailyDish {
    id: number;
    name: string;
    sold_out: boolean;
}

interface SiteSettings {
    id: number;
    tax_rate: number;
    delivery_fee: number;
}

export default function AdminPage() {
    const [todaysDishes, setTodaysDishes] = useState<DailyDish[]>([]);
    const [newDish, setNewDish] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [taxRate, setTaxRate] = useState<number>(8.0);
    const [deliveryFee, setDeliveryFee] = useState<number>(2.99);
    const [savingSettings, setSavingSettings] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const fetchSettings = async () => {
        const { data } = await supabase
            .from('site_settings')
            .select('*')
            .single();
        
        if (data) {
            setTaxRate(data.tax_rate || 8.0);
            setDeliveryFee(data.delivery_fee || 299);
        }
    };

    const saveSettings = async () => {
        setSavingSettings(true);
        
        const { error } = await supabase
            .from('site_settings')
            .upsert({ 
                id: 1,
                tax_rate: taxRate, 
                delivery_fee: deliveryFee 
            });

        if (error) {
            toast.error("Failed to save settings. Please try again.");
        } else {
            toast.success("Settings saved successfully!");
        }
        
        setSavingSettings(false);
    };

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
                .maybeSingle();

            setIsAdmin(dbUser?.role === "admin");
        };
        checkUser();
        fetchDishes();
        fetchSettings();
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
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-8 p-4 rounded-2xl bg-muted/50 border border-border text-left">
                            <p className="text-xs font-semibold text-foreground mb-2">Demo Admin Credentials</p>
                            <div className="space-y-1 text-xs text-muted-foreground font-mono">
                                <p>Email: admin@foody.com</p>
                                <p>Password: FoodyAdmin123!</p>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-3">
                                See ADMIN_SETUP.md for setup instructions
                            </p>
                        </div>
                    )}
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

                    {/* Tax & Fees Settings */}
                    <Card className="rounded-3xl border border-border shadow-sm overflow-hidden">
                        <CardHeader className="p-6 border-b border-border bg-gradient-to-r from-amber-500/5 via-primary/5 to-blue-500/5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-blue-500 flex items-center justify-center">
                                    <Percent className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-heading font-semibold">Tax & Delivery Settings</CardTitle>
                                    <p className="text-sm text-muted-foreground">Configure tax rate and delivery fees for all orders</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="taxRate" className="text-sm font-medium">
                                        Sales Tax Rate (%)
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="taxRate"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="20"
                                            value={taxRate}
                                            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                            className="rounded-xl pr-10"
                                            placeholder="8.0"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Applied to all orders. US average: 7-10%
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deliveryFee" className="text-sm font-medium">
                                        Delivery Fee ($)
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                        <Input
                                            id="deliveryFee"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={deliveryFee}
                                            onChange={(e) => setDeliveryFee(parseFloat(e.target.value) || 0)}
                                            className="rounded-xl pl-7"
                                            placeholder="2.99"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Flat rate applied to each order
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="text-sm text-muted-foreground">
                                    <p className="font-medium text-foreground">Example Order:</p>
                                    <p>$50.00 subtotal + ${deliveryFee.toFixed(2)} delivery + ${(50 * taxRate / 100).toFixed(2)} tax = <span className="font-semibold text-primary">${(50 + deliveryFee + (50 * taxRate / 100)).toFixed(2)}</span></p>
                                </div>
                                <Button 
                                    onClick={saveSettings}
                                    disabled={savingSettings}
                                    className="rounded-full gap-2"
                                >
                                    {savingSettings ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    Save Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
