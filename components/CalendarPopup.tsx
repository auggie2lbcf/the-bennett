"use client";

import React, { useMemo, useState } from "react";

/**
 * CalendarPopup
 * - Lightweight month-view calendar similar to a tray calendar in Win95.
 */
export function CalendarPopup({ onClose, onSelectDate }: { onClose: () => void; onSelectDate?: (date: Date) => void }) {
    const [refDate, setRefDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const { year, month, cells } = useMemo(() => {
        const year = refDate.getFullYear();
        const month = refDate.getMonth();
        const first = new Date(year, month, 1);
        // compute startDay implicitly via leading nulls in cells
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const cells: (number | null)[] = [
            ...Array((first.getDay() + 6) % 7).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ];
        while (cells.length % 7 !== 0) cells.push(null);
    return { year, month, cells };
    }, [refDate]);

    return (
        <div className="win95-tray-popup" onMouseLeave={onClose} role="dialog" aria-label="Calendar">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <button
                    className="win95-start"
                    style={{ padding: "2px 6px" }}
                    onClick={() => {
                        setSelectedDay(null);
                        setRefDate(new Date(year, month - 1, 1));
                    }}
                    aria-label="Previous month"
                >
                    ◀
                </button>
                <div style={{ fontWeight: 700 }}>
                    {refDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
                </div>
                <button
                    className="win95-start"
                    style={{ padding: "2px 6px" }}
                    onClick={() => {
                        setSelectedDay(null);
                        setRefDate(new Date(year, month + 1, 1));
                    }}
                    aria-label="Next month"
                >
                    ▶
                </button>
            </div>
            <div className="win95-cal" style={{ marginBottom: 6 }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d} className="d hdr">
                        {d}
                    </div>
                ))}
                {cells.map((d, i) => {
                    const isActive = d && d === selectedDay;
                    return (
                        <button
                            key={i}
                            type="button"
                            className="d"
                            style={{
                                background: d ? "var(--win95-face)" : "transparent",
                                opacity: d ? 1 : 0.5,
                                outline: isActive ? "2px dotted var(--win95-edge-light)" : "none",
                                cursor: d ? "pointer" : "default",
                                padding: 0,
                                textAlign: "center",
                            }}
                            disabled={!d}
                            onClick={() => {
                                if (!d) return;
                                setSelectedDay(d);
                                const date = new Date(refDate.getFullYear(), refDate.getMonth(), d);
                                onSelectDate?.(date);
                            }}
                            aria-label={d ? `Select ${new Date(year, month, d).toDateString()}` : undefined}
                        >
                            {d ?? ""}
                        </button>
                    );
                })}
            </div>
            <div style={{ fontSize: 12, textAlign: "center" }}>{new Date().toDateString()}</div>
            <div style={{ marginTop: 6, display: "flex", gap: 6, justifyContent: "center" }}>
                <button
                    className="win95-button"
                    disabled={!selectedDay}
                    onClick={() => {
                        if (!selectedDay) return;
                        const dt = new Date(refDate.getFullYear(), refDate.getMonth(), selectedDay);
                        onSelectDate?.(dt);
                    }}
                    aria-label="Schedule a meeting on selected date"
                >
                    Schedule
                </button>
                <button className="win95-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}