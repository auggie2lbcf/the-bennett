"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useDrag
 * - Adds draggable behavior to a positioned element via an onMouseDown handler.
 * - Returns the current position and the mouseDown handler to attach on a titlebar.
 */
export function useDrag(enabled: boolean, initial = { x: 120, y: 80 }) {
    const [pos, setPos] = useState<{ x: number; y: number }>(initial);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    // batch updates with rAF for smoother performance
    const pending = useRef<{ x?: number; y?: number } | null>(null);
    const raf = useRef<number | null>(null);

    const flush = () => {
        if (pending.current) {
            // capture values locally to avoid pending.current becoming null inside the updater
            const next = { x: pending.current.x, y: pending.current.y };
            setPos((p) => ({ x: next.x ?? p.x, y: next.y ?? p.y }));
            pending.current = null;
        }
        if (raf.current) {
            cancelAnimationFrame(raf.current);
            raf.current = null;
        }
    };

    const onPointerDown = (e: React.PointerEvent) => {
        if (!enabled) return;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        dragging.current = true;
        offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        e.preventDefault();
    };

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            if (!dragging.current) return;
            const nx = e.clientX - offset.current.x;
            const ny = e.clientY - offset.current.y;
            pending.current = { x: nx, y: ny };
            if (!raf.current) {
                raf.current = requestAnimationFrame(() => {
                    flush();
                });
            }
        };
        const onUp = () => {
            dragging.current = false;
            flush();
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, []);

    // keep backward-compatible name
    const onMouseDown = (e: React.MouseEvent) => onPointerDown(e as unknown as React.PointerEvent);

    return { pos, setPos, onPointerDown, onMouseDown };
}