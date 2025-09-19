"use client";

import React, { useEffect, useRef, useState } from "react";
import { Win95Icon } from "@/components/Win95Icons";

type StartMenuProps = {
    id?: string;
    onClose: () => void;
    onOpenAbout: () => void;
    onStartScreensaver: () => void;
    onStartBSOD: () => void;
    onShutdown: () => void;
};

export function StartMenu({
                              id,
                              onClose,
                              onOpenAbout,
                              onStartScreensaver,
                              onStartBSOD,
                              onShutdown,
                          }: StartMenuProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState(0);

    const items = [
        { label: "About Me", onClick: onOpenAbout, icon: "file" as const },
        { label: "Screensaver", onClick: onStartScreensaver, icon: "paint" as const },
        { label: "Fake BSOD", onClick: onStartBSOD, icon: "computer" as const },
        { label: "Shut Down…", onClick: onShutdown, icon: "settings" as const },
    ];

    useEffect(() => {
        // focus the container so keyboard works
        containerRef.current?.focus();
        setSelected(0);
    }, []);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelected((s) => Math.min(s + 1, items.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelected((s) => Math.max(s - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const it = items[selected];
            it.onClick();
            onClose();
        } else if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        }
    };

    return (
        <div
            id={id}
            ref={containerRef}
            className="start-menu"
            style={{ position: "fixed", bottom: 40, left: 6, zIndex: 100 }}
            onMouseLeave={onClose}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="menu"
            aria-label="Start menu"
        >
            <div className="left" role="presentation">
                {items.map((it, i) => (
                    <div
                        key={it.label}
                        className={`win95-list-item ${i === selected ? "focused" : ""}`}
                        role="menuitem"
                        onClick={() => {
                            it.onClick();
                            onClose();
                        }}
                        onMouseEnter={() => setSelected(i)}
                    >
                        <span className="icon"><Win95Icon name={it.icon} size={18} /></span>
                        <span>{it.label}</span>
                    </div>
                ))}
            </div>
            <div className="right" role="presentation">
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Welcome</div>
                <div style={{ fontSize: 12 }}>Select an item or explore the desktop.</div>
            </div>
        </div>
    );
}