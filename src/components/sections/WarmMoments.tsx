"use client";

import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";

export function WarmMoments() {
    return (
        <section className="py-24 bg-white border-t border-blue-50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Text Content */}
                    <div className="space-y-10 relative z-10">
                        <BlurFade delay={0.2} inView>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-sm">
                                <Heart className="h-4 w-4 fill-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Story & Purpose</span>
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
                                Baked with <br />
                                <span className="text-accent italic font-serif normal-case tracking-normal">Prophetic Love</span>
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.4} inView>
                            <p className="text-lg text-primary/70 leading-relaxed font-medium max-w-lg">
                                Abraham&apos;s Organic Treats started with a simple belief: that food should be a blessing.
                                We use only 100% organic ingredients, traditionally crafted recipes, and a whole lot of faith.
                                Every slice is a testament to our commitment to wholesome, delicious moments.
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.5} inView>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/menu">
                                    <Button size="lg" className="rounded-sm px-10 h-14 text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl">
                                        Order My Blessing
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button size="lg" variant="ghost" className="rounded-sm px-8 h-14 text-sm font-black uppercase tracking-widest text-primary border-2 border-primary hover:bg-primary/5">
                                        Our Journey
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </BlurFade>
                    </div>

                    {/* Visual Section */}
                    <BlurFade delay={0.2} inView className="relative">
                        <div className="relative aspect-square max-w-[500px] ml-auto">
                            <div className="absolute inset-0 bg-blue-50 rounded-sm -rotate-3" />
                            <div className="relative h-full w-full rounded-sm overflow-hidden border-8 border-white shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
                                    alt="Organic Chocolate Cake"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-6 p-6 bg-white shadow-2xl rounded-sm border border-blue-50">
                                <div className="text-3xl font-black text-primary mb-1">100%</div>
                                <div className="text-[10px] font-black text-accent uppercase tracking-widest">Organic Ingredients</div>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section>
    );
}
