"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

import { cn } from "@/lib/utils";

type AnimationStyle =
    | "from-bottom"
    | "from-center"
    | "from-top"
    | "from-left"
    | "from-right"
    | "fade"
    | "top-in-bottom-out"
    | "left-in-right-out";

interface HeroVideoProps {
    animationStyle?: AnimationStyle;
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt?: string;
    className?: string;
}

const animationVariants = {
    "from-bottom": {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
    },
    "from-center": {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
    },
    "from-top": {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "-100%", opacity: 0 },
    },
    "from-left": {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "-100%", opacity: 0 },
    },
    "from-right": {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 },
    },
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    "top-in-bottom-out": {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
    },
    "left-in-right-out": {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 },
    },
};

export const HeroVideoDialog = ({
    animationStyle = "from-center",
    videoSrc,
    thumbnailSrc,
    thumbnailAlt = "Video thumbnail",
    className,
}: HeroVideoProps) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const selectedAnimation = animationVariants[animationStyle];

    return (
        <div className={cn("relative", className)}>
            <div
                className="group relative cursor-pointer overflow-hidden rounded-md"
                onClick={() => setIsVideoOpen(true)}
            >
                <img
                    src={thumbnailSrc}
                    alt={thumbnailAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform group-hover:scale-110">
                        <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isVideoOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div
                            className="absolute inset-0"
                            onClick={() => setIsVideoOpen(false)}
                        />
                        <motion.div
                            initial={selectedAnimation.initial}
                            animate={selectedAnimation.animate}
                            exit={selectedAnimation.exit}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative mx-4 aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl"
                        >
                            <button
                                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
                                onClick={() => setIsVideoOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <iframe
                                src={videoSrc}
                                className="h-full w-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
