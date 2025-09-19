"use client";

import React from "react";

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
    return (
        <div
            id={id}
            style={{
                position: "fixed",
                bottom: 40,
                left: 6,
                width: 220,
                background: "var(--win95-face)",
                boxShadow:
                    "inset -1px -1px 0 0 var(--win95-dark), inset 1px 1px 0 0 var(--win95-light), inset -2px -2px 0 0 var(--win95-darker), inset 2px 2px 0 0 var(--win95-face)",
                zIndex: 100,
            }}
            onMouseLeave={onClose}
            role="menu"
            aria-label="Start menu"
        >
            <div className="win95-list-item" role="menuitem" onClick={onOpenAbout}>
                About Me
            </div>
            <div className="win95-list-item" role="menuitem" onClick={onStartScreensaver}>
                Screensaver
            </div>
            <div className="win95-list-item" role="menuitem" onClick={onStartBSOD}>
                Fake BSOD
            </div>
            <div
                className="win95-list-item"
                role="menuitem"
                onClick={onShutdown}
                title="Close all windows"
            >
                Shut Down…
            </div>
        </div>
    );
}