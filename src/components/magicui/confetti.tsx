"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ConfettiPiece {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
}

export function Confetti({
    trigger,
    className,
}: {
    trigger?: boolean;
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!trigger || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["#FFD700", "#FFA500", "#FFFFFF", "#F5C518", "#FFE55C"];
        const pieces: ConfettiPiece[] = [];

        // Create confetti pieces
        for (let i = 0; i < 150; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                vx: (Math.random() - 0.5) * 8,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
            });
        }

        let animationId: number;
        const startTime = Date.now();
        const duration = 4000; // 4 seconds

        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            pieces.forEach((piece) => {
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate((piece.rotation * Math.PI) / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size / 2);
                ctx.restore();

                piece.x += piece.vx;
                piece.y += piece.vy;
                piece.vy += 0.1; // gravity
                piece.rotation += piece.rotationSpeed;
            });

            if (Date.now() - startTime < duration) {
                animationId = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [trigger]);

    if (!trigger) return null;

    return (
        <canvas
            ref={canvasRef}
            className={cn("fixed inset-0 z-[100] pointer-events-none", className)}
        />
    );
}
