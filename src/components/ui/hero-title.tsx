import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function HeroTitle({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    // Styling for the text to ensure perfect overlap
    const textClass = "font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]";

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn("relative inline-block text-center cursor-default select-none", className)}
        >
            {/* Base Layer - Clean Professional Look */}
            {/* We use select-none to prevent text selection from interfering with the effect feel, 
          but usually we might want text to be selectable. 
          If selectable, the cursor tracking might feel weird if you drag. */}

            <h1 className={cn(textClass, "text-foreground")}>
                Civic engagement, <br className="hidden md:block" />
                <span className="text-primary">reimagined.</span>
            </h1>

            {/* Spotlight Layer - Vivid Reveal */}
            <div
                className="absolute inset-0 pointer-events-none mb-8 z-10"
                aria-hidden="true"
                style={{
                    maskImage: `radial-gradient(150px circle at ${position.x}px ${position.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(150px circle at ${position.x}px ${position.y}px, black, transparent)`,
                    opacity: opacity,
                    transition: "opacity 0.2s ease",
                }}
            >
                <h1 className={cn(textClass, "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]")}>
                    Civic engagement, <br className="hidden md:block" />
                    <span className="">
                        reimagined.
                    </span>
                </h1>
            </div>
        </div>
    );
}
