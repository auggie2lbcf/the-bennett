"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * useKonami
 * - Listens for the Konami code with KeyboardEvent.code (non-deprecated).
 * - Sequence: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, KeyB, KeyA
 */
export function useKonami(onTrigger: () => void) {
    const seq = useRef<string[]>([]);
    const target = useMemo(
        () => ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"],
        []
    );
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            seq.current.push(e.code);
            if (seq.current.length > target.length) seq.current.shift();
            if (target.every((v, i) => seq.current[i] === v)) {
                onTrigger();
                seq.current = [];
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onTrigger, target]);
}