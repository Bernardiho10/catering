"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AnimatedThemeToggler() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative overflow-hidden rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <div className={`relative h-6 w-6 transition-transform duration-500 ease-in-out ${theme === 'dark' ? 'rotate-90' : 'rotate-0'}`}>
                {theme === "dark" ? (
                    <Moon className="h-6 w-6 text-foreground transition-all" />
                ) : (
                    <Sun className="h-6 w-6 text-yellow-500 transition-all" />
                )}
            </div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
