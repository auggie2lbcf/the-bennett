"use client";

import React, { useMemo } from "react";
import { useDrag } from "../hooks/useDrag";

/**
 * Win95Window
 * - Reusable window with draggable titlebar, optional minimize/maximize/close.
 * - When maximized, dragging is disabled.
 */
export function Win95Window(props: {
    title: string;
    children: React.ReactNode;
    visible?: boolean;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximizeToggle?: () => void;
    maximized?: boolean;
    initialPos?: { x: number; y: number };
    zIndex?: number;
}) {
    const {
        title,
        children,
        visible = true,
        onClose,
        onMinimize,
        onMaximizeToggle,
        maximized = false,
        initialPos = { x: 120, y: 80 },
        zIndex = 10,
    } = props;

    const { pos, onMouseDown } = useDrag(!maximized, initialPos);

    const baseGrid = useMemo(
        () => ({
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            zIndex,
        } as React.CSSProperties),
        [zIndex]
    );

    const style: React.CSSProperties = maximized
        ? {
            position: "fixed",
            left: 8,
            top: 8,
            right: 8,
            bottom: 48,
            ...baseGrid,
        }
        : {
            position: "absolute",
            left: pos.x,
            top: pos.y,
            width: 920,
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "calc(100vh - 96px)",
            overflow: "hidden",
            ...baseGrid,
        };

    if (!visible) return null;

    return (
        <div className="win95-window" style={style} role="dialog" aria-label={title}>
            <div className="win95-titlebar" onMouseDown={onMouseDown} aria-grabbed={!maximized}>
                <span className="win95-title">{title}</span>
                <div className="win95-title-buttons">
                    {onMinimize && (
                        <div className="win95-btn" title="Minimize" onClick={onMinimize} role="button" aria-label="Minimize window">
                            _
                        </div>
                    )}
                    {onMaximizeToggle && (
                        <div
                            className="win95-btn"
                            title="Maximize/Restore"
                            onClick={onMaximizeToggle}
                            role="button"
                            aria-label={maximized ? "Restore window" : "Maximize window"}
                        >
                            ▢
                        </div>
                    )}
                    {onClose && (
                        <div className="win95-btn" title="Close" onClick={onClose} role="button" aria-label="Close window">
                            X
                        </div>
                    )}
                </div>
            </div>
            <div className="win95-window-body">{children}</div>
            <div className="win95-statusbar">
                <span>{title}</span>
            </div>
        </div>
    );
}