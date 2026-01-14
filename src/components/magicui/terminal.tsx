"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TerminalProps extends MotionProps {
    className?: string;
    title?: string;
    children?: React.ReactNode;
}

export const Terminal = ({ className, title, children }: TerminalProps) => {
    return (
        <div
            className={cn(
                "z-0 h-full w-full rounded-xl border border-primary/20 bg-background/50 backdrop-blur-md text-foreground font-mono text-sm shadow-2xl relative overflow-hidden",
                className,
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="flex flex-col gap-y-2 border-b border-primary/10 p-4 relative z-10">
                <div className="flex flex-row gap-x-2 items-center justify-between">
                    <div className="flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary/40" />
                        <div className="h-2 w-2 rounded-full bg-primary/20" />
                    </div>
                    {title && (
                        <div className="text-xs font-heading tracking-widest text-primary uppercase">{title}</div>
                    )}
                </div>
            </div>
            <pre className="p-6 overflow-auto relative z-10">
                <code className="grid gap-y-2 font-sans font-medium">{children}</code>
            </pre>
        </div>
    );
};

export const AnimatedSpan = ({
    children,
    delay = 0,
    className,
    ...props
}: {
    children?: React.ReactNode;
    delay?: number;
    className?: string;
} & MotionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay / 1000 }}
            className={cn("grid text-sm font-normal tracking-tight", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const TypingAnimation = ({
    children,
    className,
    duration = 60,
    delay = 0,
    as: Component = "span",
    ...props
}: {
    children: string;
    className?: string;
    duration?: number;
    delay?: number;
    as?: any;
} & MotionProps) => {
    const MotionComponent = motion(Component);
    const [displayedText, setDisplayedText] = useState<string>("");
    const [started, setStarted] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < children.length) {
                setDisplayedText(children.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, duration);

        return () => {
            clearInterval(typingEffect);
        };
    }, [children, duration, started]);

    return (
        <MotionComponent
            ref={elementRef}
            className={cn("text-sm font-normal tracking-tight", className)}
            {...props}
        >
            {displayedText}
        </MotionComponent>
    );
};
