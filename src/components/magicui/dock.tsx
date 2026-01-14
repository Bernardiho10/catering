"use client"

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
    className?: string;
    magnification?: number;
    distance?: number;
    children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
    "mx-auto w-max h-[58px] p-2 flex gap-2 rounded-2xl border supports-backdrop-blur:bg-white/10 bg-white/10 backdrop-blur-md",
);

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
    (
        {
            className,
            children,
            magnification = DEFAULT_MAGNIFICATION,
            distance = DEFAULT_DISTANCE,
            ...props
        },
        ref,
    ) => {
        const mouseX = useMotionValue(Infinity);

        const renderChildren = () => {
            return React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    mouseX: mouseX,
                    magnification: magnification,
                    distance: distance,
                });
            });
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                {...props}
                className={cn(dockVariants({ className }), "fixed bottom-4 left-1/2 -translate-x-1/2 z-50")}
            >
                {renderChildren()}
            </motion.div>
        );
    },
);

Dock.displayName = "Dock";

export interface DockIconProps {
    size?: number;
    magnification?: number;
    distance?: number;
    mouseX?: any;
    className?: string;
    children?: React.ReactNode;
    props?: any;
}

export const DockIcon = ({
    size,
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    mouseX,
    className,
    children,
    ...props
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const distanceCalc = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [40, magnification, 40],
    );

    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={cn(
                "aspect-square cursor-pointer rounded-full bg-gray-200/50 flex items-center justify-center origin-bottom",
                className,
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
