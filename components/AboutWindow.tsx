"use client";

import React from "react";
import { Win95Window } from "@/components/Win95Window";
import { useUIState } from "@/hooks/useUIState";

/**
 * AboutWindow
 * - Simple informational window about the author.
 */
export function AboutWindow() {
    const { aboutVisible, setAboutVisible } = useUIState();

    return (
        <Win95Window title="About Me" visible={aboutVisible} onClose={() => setAboutVisible(false)} zIndex={25}>
            <div style={{ display: "grid", gap: 8 }}>
                <div className="win95-group">Hello! I build websites and apps with care for UX and performance.</div>
                <div className="win95-group">
                    - Click Start for extras
                    <br />- Try the Konami code
                    <br />- Drag windows by their title bars
                </div>
            </div>
        </Win95Window>
    );
}