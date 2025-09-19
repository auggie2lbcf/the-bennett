"use client";

import React, { useEffect, useRef } from "react";

/**
 * BouncingLogo
 * - Simple screensaver style bouncing rectangle with the word "PORTFOLIO".
 */
export function BouncingLogo() {
    const ref = useRef<HTMLDivElement>(null);
    const vel = useRef({ x: 2, y: 2 });
    const req = useRef<number | null>(null);


    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let x = 100;
        let y = 100;

        const step = () => {
            const parent = el.parentElement!;
            const pw = parent.clientWidth;
            const ph = parent.clientHeight;
            const w = el.clientWidth;
            const h = el.clientHeight;

            x += vel.current.x;
            y += vel.current.y;

            if (x <= 0 || x + w >= pw) vel.current.x *= -1;
            if (y <= 0 || y + h >= ph) vel.current.y *= -1;

            x = Math.max(0, Math.min(x, pw - w));
            y = Math.max(0, Math.min(y, ph - h));

            el.style.transform = `translate(${x}px, ${y}px)`;
            req.current = requestAnimationFrame(step);
        };

        req.current = requestAnimationFrame(step);
        return () => {
            if (req.current) cancelAnimationFrame(req.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: "absolute",
                width: 200,
                height: 120,
                background: "#000",
                border: "4px solid #008080",
                color: "#0ff",
                display: "grid",
                placeItems: "center",
                fontFamily: "Impact, sans-serif",
                fontSize: 28,
                textShadow: "2px 2px 0 #000",
                userSelect: "none",
            }}
        >
            PORTFOLIO
        </div>
    );
}