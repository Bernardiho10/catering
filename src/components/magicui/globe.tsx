"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = 300;
        canvas.width = size * 2;
        canvas.height = size * 2;

        let animationId: number;
        let angle = 0;

        const drawGlobe = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = size * 0.8;

            // Outer glow
            const glowGradient = ctx.createRadialGradient(
                centerX,
                centerY,
                radius * 0.8,
                centerX,
                centerY,
                radius * 1.2
            );
            glowGradient.addColorStop(0, "rgba(255, 215, 0, 0.3)");
            glowGradient.addColorStop(1, "rgba(255, 215, 0, 0)");
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Globe base
            const gradient = ctx.createRadialGradient(
                centerX - radius * 0.3,
                centerY - radius * 0.3,
                0,
                centerX,
                centerY,
                radius
            );
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
            gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.4)");
            gradient.addColorStop(1, "rgba(200, 170, 0, 0.2)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            // Latitude lines
            ctx.strokeStyle = "rgba(255, 215, 0, 0.3)";
            ctx.lineWidth = 1;
            for (let i = -3; i <= 3; i++) {
                const y = centerY + i * (radius / 4);
                const widthAtY = Math.sqrt(radius * radius - Math.pow(i * (radius / 4), 2));
                ctx.beginPath();
                ctx.ellipse(centerX, y, widthAtY, widthAtY * 0.15, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Longitude lines (rotating)
            for (let i = 0; i < 8; i++) {
                const lineAngle = angle + (i * Math.PI) / 4;
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255, 215, 0, 0.2)";
                ctx.ellipse(
                    centerX,
                    centerY,
                    radius * Math.abs(Math.cos(lineAngle)),
                    radius,
                    0,
                    0,
                    Math.PI * 2
                );
                ctx.stroke();
            }

            // Marker dots
            const markers = [
                { lat: 0.5, lng: angle },
                { lat: -0.3, lng: angle + 1 },
                { lat: 0.2, lng: angle + 2.5 },
            ];

            markers.forEach((marker) => {
                const x = centerX + radius * 0.8 * Math.cos(marker.lng) * Math.cos(marker.lat);
                const y = centerY + radius * 0.8 * Math.sin(marker.lat);
                if (Math.cos(marker.lng) > 0) {
                    ctx.fillStyle = "rgba(255, 215, 0, 0.9)";
                    ctx.beginPath();
                    ctx.arc(x, y, 4, 0, Math.PI * 2);
                    ctx.fill();

                    // Pulse effect
                    ctx.strokeStyle = "rgba(255, 215, 0, 0.4)";
                    ctx.beginPath();
                    ctx.arc(x, y, 8 + Math.sin(Date.now() / 200) * 3, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });

            angle += 0.01;
            animationId = requestAnimationFrame(drawGlobe);
        };

        drawGlobe();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div
            className={cn(
                "relative flex h-full w-full max-w-[300px] items-center justify-center overflow-hidden rounded-full",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                style={{ width: 300, height: 300, maxWidth: "100%", aspectRatio: 1 }}
            />
        </div>
    );
}
