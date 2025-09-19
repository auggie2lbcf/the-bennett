// components/Desktop.tsx
"use client";
import React, {useRef} from "react";
import {Win95Icon} from "@/components/Win95Icons";
import {useUIState} from "@/hooks/useUIState";
import {ProjectWindow} from "@/components/ProjectWindow";

const PROJECTS: Array<{ id: string; title: string; icon: "folder" | "notepad" | "paint" | "file" | "computer"; url: string }> = [
    {id: "proj-portfolio", title: "Church Website", icon: "folder", url: "https://covenantcommunity.org"},
    {id: "proj-blog", title: "Coffee Website", icon: "notepad", url: "https://itsthevine.com"},
    {id: "proj-lab", title: "Lab", icon: "paint", url: "https://example.com/lab"},
];

export function Desktop() {
    const {projects, openProject} = useUIState();
    const clickTimers = useRef<Record<string, any>>({});

    const handleIconClick = (pid: string, meta: { title: string; icon: string; url: string }) => {
        const t = clickTimers.current[pid];
        if (t) {
            clearTimeout(t);
            clickTimers.current[pid] = null;
            openProject(pid, meta);
            return;
        }
        clickTimers.current[pid] = setTimeout(() => {
            clearTimeout(clickTimers.current[pid]);
            clickTimers.current[pid] = null;
        }, 250);
    };

    return (
        <div className="desktop"
             style={{position: "relative", width: "100%", height: "100%", background: "var(--win95-desktop, #008080)"}}>
            <div className="desktop-icons" style={{display: "grid", gridAutoRows: "min-content", gap: 12, padding: 12}}>
                {PROJECTS.map((p) => (
                    <button
                        key={p.id}
                        className="desktop-icon"
                        onClick={() => handleIconClick(p.id, {title: p.title, icon: p.icon, url: p.url})}
                        onDoubleClick={() => openProject(p.id, {title: p.title, icon: p.icon, url: p.url})}
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

            {projects.map((p) => (
                <ProjectWindow key={p.id} id={p.id}>
                    <div style={{lineHeight: 1.4}}>
                        <strong>{p.title}</strong>
                        <p>This is the {p.title} app window. Put your project UI here.</p>
                    </div>
                </ProjectWindow>
            ))}
        </div>
    );
}