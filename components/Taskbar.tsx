// components/Taskbar.tsx
"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Win95Icon, IconName } from "@/components/Win95Icons";
import { useUIState } from "@/hooks/useUIState";
import { CalendarPopup } from "@/components/CalendarPopup";

function buildGoogleCalendarCreateUrl(date: Date) {
  // All-day placeholder; customize as needed
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const start = `${y}${m}${d}`;
  const end = `${y}${m}${String(date.getDate() + 1).padStart(2, "0")}`;
  const text = encodeURIComponent("Meeting with Your Name");
  const details = encodeURIComponent("Booked from the Win95 desktop.");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${start}/${end}&text=${text}&details=${details}`;
}

export function Taskbar() {
  const {
    time,
    startOpen, setStartOpen,
    calendarOpen, setCalendarOpen,
    volumeOpen, setVolumeOpen,
    projects, toggleProjectMinimize, bringProjectToFront,
    mainMinimized, toggleMainMinimized,
    aboutVisible, toggleAboutVisible
  } = useUIState();

  const runningButtons = useMemo(() => {
    const items: Array<{ id: string; title: string; minimized: boolean; icon: IconName; onClick: () => void }> = [];

    items.push({
      id: "main",
      title: "Main",
      minimized: mainMinimized,
      icon: "computer",
      onClick: toggleMainMinimized,
    });

    items.push({
      id: "about",
      title: "About",
      minimized: !aboutVisible,
      icon: "file",
      onClick: toggleAboutVisible,
    });

    projects.forEach((p) => {
      items.push({
        id: p.id,
        title: p.title,
        minimized: p.minimized,
        icon: p.icon,
        onClick: () => (p.minimized ? bringProjectToFront(p.id) : toggleProjectMinimize(p.id)),
      });
    });

    return items;
  }, [projects, mainMinimized, aboutVisible, bringProjectToFront, toggleProjectMinimize, toggleMainMinimized, toggleAboutVisible]);

  const [, setTrayHover] = useState(false);

  const onSelectDate = useCallback((date: Date) => {
    const url = buildGoogleCalendarCreateUrl(date);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="taskbar" style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: 36, background: "#C0C0C0", borderTop: "2px solid #fff", display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", zIndex: 9999 }}>
      <button
        className="start-button win95-start"
        onClick={() => setStartOpen((v) => !v)}
        aria-expanded={startOpen}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px" }}
      >
        <Win95Icon name="start" />
        Start
      </button>

      <div className="task-buttons" style={{ display: "flex", gap: 6, flex: 1 }}>
        {runningButtons.map((b) => (
          <button
            key={b.id}
            className="win95-button"
            onClick={b.onClick}
            style={{
              minWidth: 120,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: b.minimized ? "#DFDFDF" : "#EAEAEA",
            }}
            aria-pressed={!b.minimized}
          >
            <Win95Icon name={b.icon} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {b.title}
            </span>
          </button>
        ))}
      </div>

      <div
        className="system-tray"
        onMouseEnter={() => setTrayHover(true)}
        onMouseLeave={() => setTrayHover(false)}
        style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}
      >
        <button
          className="win95-button"
          onClick={() => setVolumeOpen((v) => !v)}
          aria-label="Volume"
          aria-expanded={volumeOpen}
        >
          <Win95Icon name="volume" />
        </button>

        <button
          className="win95-button"
          onClick={() => setCalendarOpen((v) => !v)}
          aria-label="Calendar"
          aria-expanded={calendarOpen}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <Win95Icon name="calendar" />
          <span style={{ minWidth: 52, textAlign: "right" }}>{time || "--:--"}</span>
        </button>

        {calendarOpen && (
          <div style={{ position: "absolute", right: 0, bottom: 40 }}>
            <CalendarPopup
              onClose={() => setCalendarOpen(false)}
              onSelectDate={(date) => {
                onSelectDate(date);
                // Optionally keep open until mouse leaves
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}