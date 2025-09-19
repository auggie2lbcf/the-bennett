// components/Win95Icons.tsx
"use client";
import React from "react";

export type IconName =
    | "computer"
    | "folder"
    | "file"
    | "notepad"
    | "paint"
    | "settings"
    | "calendar"
    | "volume"
    | "start";

export function Win95Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string }) {
    const common = { width: size, height: size, style: { imageRendering: "pixelated" as const } };
    switch (name) {
        case "start":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="Start">
                    <rect x="0" y="0" width="16" height="16" fill="#008080" />
                    <rect x="1" y="1" width="14" height="14" fill="#00C0C0" />
                    <rect x="2" y="2" width="12" height="12" fill="#008080" />
                </svg>
            );
        case "calendar":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="Calendar">
                    <rect x="1" y="3" width="14" height="12" fill="#C0C0C0" stroke="#000" />
                    <rect x="1" y="3" width="14" height="3" fill="#808080" />
                    <rect x="3" y="1" width="2" height="4" fill="#000" />
                    <rect x="11" y="1" width="2" height="4" fill="#000" />
                    <rect x="3" y="7" width="2" height="2" fill="#000" />
                    <rect x="7" y="7" width="2" height="2" fill="#000" />
                    <rect x="11" y="7" width="2" height="2" fill="#000" />
                </svg>
            );
        case "volume":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="Volume">
                    <rect x="1" y="6" width="4" height="4" fill="#000" />
                    <polygon points="5,6 9,3 9,13 5,10" fill="#000" />
                    <rect x="11" y="5" width="1" height="6" fill="#000" />
                </svg>
            );
        case "computer":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="My Computer">
                    <rect x="2" y="2" width="12" height="8" fill="#C0C0C0" stroke="#000" />
                    <rect x="3" y="3" width="10" height="6" fill="#000" />
                    <rect x="5" y="11" width="6" height="2" fill="#808080" stroke="#000" />
                </svg>
            );
        case "folder":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="Folder">
                    <rect x="1" y="4" width="14" height="10" fill="#C8A000" stroke="#000" />
                    <rect x="1" y="3" width="6" height="3" fill="#E0C060" stroke="#000" />
                </svg>
            );
        case "file":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="File">
                    <rect x="3" y="2" width="10" height="12" fill="#FFF" stroke="#000" />
                    <rect x="4" y="4" width="8" height="1" fill="#000" />
                    <rect x="4" y="6" width="8" height="1" fill="#000" />
                </svg>
            );
        case "notepad":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="Notepad">
                    <rect x="2" y="2" width="12" height="12" fill="#FFF" stroke="#000" />
                    <rect x="3" y="3" width="10" height="1" fill="#000" />
                    <rect x="3" y="5" width="10" height="1" fill="#000" />
                    <rect x="3" y="7" width="10" height="1" fill="#000" />
                </svg>
            );
        case "paint":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="Paint">
                    <circle cx="6" cy="6" r="3" fill="#C0C0C0" stroke="#000" />
                    <rect x="9" y="8" width="5" height="2" fill="#804000" stroke="#000" />
                </svg>
            );
        case "settings":
            return (
                <svg {...common} viewBox="0 0 16 16" className={className} role="img" aria-label="Settings">
                    <circle cx="8" cy="8" r="3" fill="#808080" stroke="#000" />
                    <rect x="7" y="1" width="2" height="4" fill="#000" />
                    <rect x="7" y="11" width="2" height="4" fill="#000" />
                </svg>
            );
        default:
            return null;
    }
}