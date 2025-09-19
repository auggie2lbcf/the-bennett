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

    const onMouseDown = (e: React.MouseEvent) => {
        if (!enabled) return;
        dragging.current = true;
        offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        e.preventDefault();
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
        };
        const onUp = () => {
            dragging.current = false;
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    }, []);

    return { pos, setPos, onMouseDown };
}