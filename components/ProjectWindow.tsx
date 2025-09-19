// components/ProjectWindow.tsx
"use client";
import React, { useMemo, useRef } from "react";
import { Win95Icon, IconName } from "./Win95Icons";
import { useUIState } from "@/hooks/useUIState";
import { useDrag } from "@/hooks/useDrag";

export function ProjectWindow({ id, children }: { id: string; children: React.ReactNode }) {
    const { projects, toggleProjectMinimize, toggleProjectMaximize, closeProject, bringProjectToFront } = useUIState();
    const win = projects.find((p) => p.id === id) ?? null;

    // Stable initial offset per window, so they don't stack perfectly
    const index = projects.findIndex((p) => p.id === id);
    const initial = useMemo(() => ({ x: 120 + index * 24, y: 96 + index * 24 }), [index]);

    // Allow dragging only when not maximized (safe even if win is null)
    const dragEnabled = !(win?.maximized ?? false);
    const { pos, setPos, onMouseDown } = useDrag(dragEnabled, initial);

    // Remember previous geometry for restore after maximize
    const prevRect = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

    if (!win || !win.visible || win.minimized) return null;

    const onTitlebarDoubleClick = () => {
        if (!win.maximized) {
            // save current rect before maximizing
            prevRect.current = {
                x: pos.x,
                y: pos.y,
                width: 760,
                height: 480,
            };
        } else if (prevRect.current) {
            // restore last rect
            setPos({ x: prevRect.current.x, y: prevRect.current.y });
        }
        toggleProjectMaximize(id);
    };

    return (
        <div
            className={`win95-window ${win.maximized ? "maximized" : ""}`}
            onMouseDown={() => bringProjectToFront(id)}
            style={{
                position: "absolute",
                // maximized -> dock to viewport, else use draggable position
                inset: win.maximized ? 0 : undefined,
                top: win.maximized ? undefined : pos.y,
                left: win.maximized ? undefined : pos.x,
                width: win.maximized ? undefined : (prevRect.current?.width ?? 760),
                height: win.maximized ? undefined : (prevRect.current?.height ?? 480),
                zIndex: 100 + (index + 1),
            }}
            role="dialog"
            aria-label={win.title}
        >
            <div
                className="title-bar"
                onMouseDown={onMouseDown}
                onDoubleClick={onTitlebarDoubleClick}
                role="toolbar"
                aria-label={`${win.title} window title bar`}
            >
                <div className="title-bar-text" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Win95Icon name={win.icon as IconName} />
                    {win.title}
                </div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" onClick={() => toggleProjectMinimize(id)} />
                    <button aria-label={win.maximized ? "Restore" : "Maximize"} onClick={onTitlebarDoubleClick} />
                    <button aria-label="Close" onClick={() => closeProject(id)} />
                </div>
            </div>
            <div className="window-body" style={{ padding: 0, background: "var(--win95-face)", height: "calc(100% - 28px)" }}>
                {win.url ? (
                    <iframe
                        title={win.title}
                        src={win.url}
                        style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        allow="clipboard-read; clipboard-write; fullscreen; geolocation; microphone; camera; autoplay"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                    />
                ) : (
                    <div style={{ padding: 8 }}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}