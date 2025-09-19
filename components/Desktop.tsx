// components/Desktop.tsx
"use client";
import React, {useRef} from "react";
import {Win95Icon, AnyIconName} from "@/components/Win95Icons";
import {useUIState} from "@/hooks/useUIState";
import Win95Window from "@/components/Win95Window";
import AboutMe from "@/components/AboutMe";

const PROJECTS: Array<{ id: string; title: string; icon: AnyIconName; url: string; openInNewTab?: boolean }> = [
    {id: "proj-portfolio", title: "Church Website", icon: "folder", url: "https://covenantcommunity.org"},
    {id: "proj-blog", title: "Coffee Website", icon: "notepad", url: "https://itsthevine.com"},
    // GitHub blocks embedding via X-Frame-Options; prefer open in new tab
    {id: "github", title: "GitHub: Auggie2lbcf", icon: "github", url: "https://github.com/auggie2lbcf", openInNewTab: true}
];

export function Desktop() {
    const {projects, openProject, closeProject, aboutVisible, aboutMinimized, setAboutVisible} = useUIState();
    const clickTimers = useRef<Record<string, number | null>>({});

    const handleIconClick = (pid: string, meta: { title: string; icon: AnyIconName; url: string; openInNewTab?: boolean }) => {
        const t = clickTimers.current[pid];
        if (t) {
            clearTimeout(t);
            clickTimers.current[pid] = null;
            openProject(pid, meta);
            return;
        }
        const id = window.setTimeout(() => {
            if (clickTimers.current[pid]) {
                clearTimeout(clickTimers.current[pid] as number);
                clickTimers.current[pid] = null;
            }
        }, 250);
        clickTimers.current[pid] = id;
    };

    return (
        <div className="desktop"
             style={{position: "relative", width: "100%", height: "100%", background: "var(--win95-desktop, #008080)"}}>
            <div className="desktop-icons" style={{display: "grid", gridAutoRows: "min-content", gap: 12, padding: 12}}>
                {PROJECTS.map((p) => (
                    <button
                        key={p.id}
                        className="desktop-icon"
                        onClick={() => handleIconClick(p.id, {title: p.title, icon: p.icon, url: p.url, openInNewTab: p.openInNewTab})}
                                onDoubleClick={(e: React.MouseEvent) => {
                                    // If the project explicitly prefers to open in a new tab, do that and don't open a window
                                    if (p.url && p.openInNewTab) {
                                        window.open(p.url, "_blank");
                                        return;
                                    }
                                    // Otherwise allow modifier keys / middle-click to force a new tab
                                    if (p.url && (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1)) {
                                        window.open(p.url, "_blank");
                                        return;
                                    }
                                    openProject(p.id, { title: p.title, icon: p.icon, url: p.url });
                                }}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#fff",
                            width: 80,
                            textAlign: "center"
                        }}
                        aria-label={`Open ${p.title}`}
                    >
                        <Win95Icon name={p.icon} size={32}/>
                        <div style={{marginTop: 6, textShadow: "1px 1px 0 #000"}}>{p.title}</div>
                    </button>
                ))}
            </div>

            {projects.filter((p) => !p.minimized).map((p) => (
                <Win95Window
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    icon={p.icon}
                    url={p.url}
                    initial={{ x: p.left ?? 120, y: p.top ?? 96, width: p.width ?? 760, height: p.height ?? 480 }}
                    onClose={() => closeProject(p.id)}
                >
                    {!p.url && (
                        <div style={{ padding: 12 }}>
                            <strong>{p.title}</strong>
                            <p style={{ marginTop: 8 }}>This is a mocked app window.</p>
                        </div>
                    )}
                </Win95Window>
            ))}

            {/* About window (separate from projects) */}
            {aboutVisible && !aboutMinimized && (
                <AboutMe id="about-me" onClose={() => setAboutVisible(false)} />
            )}
        </div>
    );
}