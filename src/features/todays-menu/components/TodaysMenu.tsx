"use client";

import { Marquee } from "@/components/magicui/marquee";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/magicui/terminal";
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog";
import VideoText from "@/components/magicui/video-text";
import { Globe } from "@/components/magicui/globe";
import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function TodaysMenu() {
    const [dishes, setDishes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        const fetchMenu = async () => {
            const { data, error } = await supabase
                .from('daily_menu')
                .select('name')
                .eq('sold_out', false)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setDishes(data.map(d => d.name));
            }
            setIsLoading(false);
        };

        fetchMenu();

        const channel = supabase
            .channel('daily_menu_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'daily_menu' },
                () => {
                    fetchMenu();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Fallback if DB is empty or loading
    const displayDishes = dishes.length > 0 ? dishes : (isLoading ? ["Preparing today’s menu…"] : ["No dishes available right now."]);

    return (
        <section className="container px-4 py-24 space-y-24 relative z-10" id="todays-menu">
            {/* Header */}
            <div className="text-center space-y-4">
                <BlurFade delay={0.25} inView>
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl font-heading text-foreground">
                        Today's <span className="text-primary">Masterpieces</span>
                    </h2>
                </BlurFade>
                <BlurFade delay={0.5} inView>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-light">
                        Freshly crafted by our divine culinary artisans.
                    </p>
                </BlurFade>
            </div>

            {/* Marquee */}
            {/* ... (Marquee section unchanged, but for brevity in this tool call, assume it's sandwiched here) ... */}
            <div className="relative flex h-[100px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {displayDishes.map((dish, i) => (
                        <div key={i} className={cn(
                            "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                            "flex items-center justify-center font-bold text-lg font-heading"
                        )}>
                            {dish}
                        </div>
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>


            {/* Terminal & Globe Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="h-[400px]">
                    <Terminal title="Divine_Chronicles">
                        {/* ... (Terminal content) ... */}
                        <AnimatedSpan delay={1000} className="text-primary/80 font-serif italic">
                            <span>Kitchen fires lit.</span>
                        </AnimatedSpan>
                        <AnimatedSpan delay={1500} className="text-primary/70 font-serif italic">
                            <span>Chef’s inspiration gathered.</span>
                        </AnimatedSpan>
                        <AnimatedSpan delay={2000} className="text-primary/60 font-serif italic">
                            <span>Unveiling today’s masterpieces…</span>
                        </AnimatedSpan>
                        <AnimatedSpan delay={2500} className="text-primary/40">
                            <span>------------------------------------</span>
                        </AnimatedSpan>
                        {displayDishes.map((dish, i) => (
                            <AnimatedSpan key={i} delay={3000 + (i * 500)} className="text-foreground">
                                <span>{`> Preparing: ${dish}`}</span>
                            </AnimatedSpan>
                        ))}
                        <AnimatedSpan delay={6000} className="text-primary font-bold">
                            <span>All dishes are ready for service.</span>
                        </AnimatedSpan>
                        <TypingAnimation delay={7000} className="text-muted-foreground">
                            Awaiting your selection…
                        </TypingAnimation>
                    </Terminal>
                </div>

                <div className="relative flex h-[400px] items-center justify-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background/50 cursor-pointer hover:border-primary/50 transition-colors group">
                                <div className="absolute top-4 z-10 bg-background/80 px-4 py-1 rounded-full border border-primary/20 backdrop-blur-sm group-hover:bg-primary/10 transition-colors">
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Click to View Menu</span>
                                </div>
                                <Globe className="scale-75 translate-y-10" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="glass-panel border-primary/20 sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-heading text-center text-primary">Today's Menu</DialogTitle>
                                <DialogDescription className="text-center">
                                    Available exclusively for our divine guests.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {displayDishes.map((dish, i) => (
                                    <div key={i} className="flex items-center gap-4 border-b border-primary/10 pb-4 last:border-0 last:pb-0">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        <span className="font-heading font-medium">{dish}</span>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Hero Video */}
            <div className="space-y-8">
                <div className="flex justify-center">
                    <VideoText title="Behind The Scenes" />
                </div>
                <HeroVideoDialog
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Cooking Video"
                    className="w-full max-w-4xl mx-auto dark:hidden block"
                />
                <HeroVideoDialog
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Cooking Video"
                    className="w-full max-w-4xl mx-auto hidden dark:block"
                />
            </div>
        </section>
    );
}
