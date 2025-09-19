"use client";

import React from "react";

/**
 * VolumePopup
 * - Small tray popup to adjust mute and volume level.
 */
export function VolumePopup({
                                volume,
                                setVolume,
                                muted,
                                setMuted,
                            }: {
    volume: number;
    setVolume: (v: number) => void;
    muted: boolean;
    setMuted: (m: boolean) => void;
}) {
    return (
        <div className="win95-tray-popup" style={{ right: 8 }} role="dialog" aria-label="Volume">
            <div style={{ marginBottom: 8, fontWeight: 700 }}>Volume</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                    className="win95-start"
                    style={{ padding: "2px 6px" }}
                    onClick={() => setMuted(!muted)}
                    title={muted ? "Unmute" : "Mute"}
                    aria-pressed={muted}
                >
                    {muted ? "🔇" : "🔊"}
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={muted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    style={{ width: 140 }}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={muted ? 0 : volume}
                    aria-label="Volume level"
                />
            </div>
        </div>
    );
}