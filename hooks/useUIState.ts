"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ProjectWindowState = {
    id: string;
    title: string;
    icon: string;          // key from Win95Icons
    visible: boolean;
    minimized: boolean;
    maximized: boolean;
    url?: string;          // external app URL to embed
};

type UIState = {
    // main window
    mainVisible: boolean;
    setMainVisible: React.Dispatch<React.SetStateAction<boolean>>;
    mainMinimized: boolean;
    setMainMinimized: React.Dispatch<React.SetStateAction<boolean>>;
    mainMaximized: boolean;
    setMainMaximized: React.Dispatch<React.SetStateAction<boolean>>;

    // about window
    aboutVisible: boolean;
    setAboutVisible: React.Dispatch<React.SetStateAction<boolean>>;

    // overlays
    screensaverOn: boolean;
    setScreensaverOn: React.Dispatch<React.SetStateAction<boolean>>;
    bsodOn: boolean;
    setBsodOn: React.Dispatch<React.SetStateAction<boolean>>;

    // start & menus
    startOpen: boolean;
    setStartOpen: React.Dispatch<React.SetStateAction<boolean>>;
    calendarOpen: boolean;
    setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    volumeOpen: boolean;
    setVolumeOpen: React.Dispatch<React.SetStateAction<boolean>>;

    // system state
    time: string;                 // empty string on server, set after mount
    online: boolean | null;       // null on server, set after mount

    // audio
    volume: number;
    setVolume: (v: number) => void;
    muted: boolean;
    setMuted: Setter<boolean>;

    // projects (desktop apps)
    projects: ProjectWindowState[];
    openProject: (id: string, meta?: Partial<Pick<ProjectWindowState, "title" | "icon" | "url">>) => void;
    closeProject: (id: string) => void;
    toggleProjectMinimize: (id: string) => void;
    toggleProjectMaximize: (id: string) => void;
    bringProjectToFront: (id: string) => void;

    // actions (derived)
    ensurePortfolioShown: () => void;
    openAbout: () => void;
    startScreensaver: () => void;
    triggerBSOD: () => void;
    shutdownAll: () => void;
    toggleMainMinimized: () => void;
    toggleAboutVisible: () => void;
};

const Ctx = createContext<UIState | null>(null);

export function UIStateProvider({ children }: { children: React.ReactNode }) {
    // main window
    const [mainVisible, setMainVisible] = useState(true);
    const [mainMinimized, setMainMinimized] = useState(false);
    const [mainMaximized, setMainMaximized] = useState(false);

    // about window
    const [aboutVisible, setAboutVisible] = useState(false);

    // overlays
    const [screensaverOn, setScreensaverOn] = useState(false);
    const [bsodOn, setBsodOn] = useState(false);

    // start & menus
    const [startOpen, setStartOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [volumeOpen, setVolumeOpen] = useState(false);

    // system
    const [time, setTime] = useState<string>(""); // SSR-safe placeholder
    const [online, setOnline] = useState<boolean | null>(null); // SSR-safe placeholder

    // audio
    const [volume, _setVolume] = useState(70);
    const [muted, setMuted] = useState(false);

    // projects
    const [projects, setProjects] = useState<ProjectWindowState[]>([]);

    // effects
    useEffect(() => {
        setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        const id = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }, 1000 * 30);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const init = () => setOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
        init();
        const on = () => setOnline(true);
        const off = () => setOnline(false);
        window.addEventListener("online", on);
        window.addEventListener("offline", off);
        return () => {
            window.removeEventListener("online", on);
            window.removeEventListener("offline", off);
        };
    }, []);

    const setVolume = (v: number) => {
        _setVolume(v);
        if (v === 0) setMuted(true);
        else if (muted) setMuted(false);
    };

    // project actions
    const openProject: UIState["openProject"] = (id, meta) => {
        setProjects((cur) => {
            const exists = cur.find((p) => p.id === id);
            if (exists) {
                return cur.map((p) =>
                    p.id === id ? { ...p, visible: true, minimized: false, url: meta?.url ?? p.url } : p
                );
            }
            return [
                ...cur,
                {
                    id,
                    title: meta?.title ?? id,
                    icon: meta?.icon ?? "folder",
                    visible: true,
                    minimized: false,
                    maximized: false,
                    url: meta?.url,
                },
            ];
        });
    };

    const closeProject: UIState["closeProject"] = (id) => {
        setProjects((cur) => cur.filter((p) => p.id !== id));
    };

    const toggleProjectMinimize: UIState["toggleProjectMinimize"] = (id) => {
        setProjects((cur) =>
            cur.map((p) => (p.id === id ? { ...p, minimized: !p.minimized, visible: !p.minimized || p.visible } : p))
        );
    };

    const toggleProjectMaximize: UIState["toggleProjectMaximize"] = (id) => {
        setProjects((cur) => cur.map((p) => (p.id === id ? { ...p, maximized: !p.maximized } : p)));
    };

    const bringProjectToFront: UIState["bringProjectToFront"] = (id) => {
        // naive: reorder so the clicked project is last (on top)
        setProjects((cur) => {
            const idx = cur.findIndex((p) => p.id === id);
            if (idx === -1) return cur;
            const copy = [...cur];
            const [item] = copy.splice(idx, 1);
            copy.push({ ...item, visible: true, minimized: false });
            return copy;
        });
    };

    const value = useMemo<UIState>(() => ({
        mainVisible, setMainVisible,
        mainMinimized, setMainMinimized,
        mainMaximized, setMainMaximized,

        aboutVisible, setAboutVisible,

        screensaverOn, setScreensaverOn,
        bsodOn, setBsodOn,

        startOpen, setStartOpen,
        calendarOpen, setCalendarOpen,
        volumeOpen, setVolumeOpen,

        time, online,

        volume, setVolume,
        muted, setMuted,

        projects,
        openProject,
        closeProject,
        toggleProjectMinimize,
        toggleProjectMaximize,
        bringProjectToFront,

        ensurePortfolioShown: () => {
            if (!mainVisible) setMainVisible(true);
            setMainMinimized(false);
        },
        openAbout: () => setAboutVisible(true),
        startScreensaver: () => setScreensaverOn(true),
        triggerBSOD: () => setBsodOn(true),
        shutdownAll: () => {
            setMainVisible(false);
            setAboutVisible(false);
            setProjects([]);
        },
        toggleMainMinimized: () => setMainMinimized((m) => !m),
        toggleAboutVisible: () => setAboutVisible((v) => !v),
    }), [
        mainVisible, mainMinimized, mainMaximized, aboutVisible,
        screensaverOn, bsodOn, startOpen, calendarOpen, volumeOpen,
        time, online, volume, muted, projects
    ]);

    return React.createElement(Ctx.Provider, { value }, children);

}

export function useUIState(): UIState {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useUIState must be used within UIStateProvider");
    return ctx;
}