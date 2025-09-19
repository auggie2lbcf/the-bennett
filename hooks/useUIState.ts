"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { AnyIconName } from "@/components/Win95Icons";

type ProjectWindowState = {
    id: string;
    title: string;
    icon: AnyIconName;          // key from Win95Icons (includes legacy aliases)
    visible: boolean;
    url?: string;          // external app URL to embed
    minimized?: boolean;
    maximized?: boolean;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    zIndex?: number;
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
    aboutMinimized: boolean;
    setAboutMinimized: React.Dispatch<React.SetStateAction<boolean>>;
    aboutMaximized: boolean;
    setAboutMaximized: React.Dispatch<React.SetStateAction<boolean>>;

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
    setMuted: React.Dispatch<React.SetStateAction<boolean>>;

    // projects (desktop apps)
    projects: ProjectWindowState[];
    openProject: (id: string, meta?: Partial<Pick<ProjectWindowState, "title" | "icon" | "url">>) => void;
    closeProject: (id: string) => void;
    setProjectMinimized: (id: string, v: boolean) => void;
    toggleProjectMaximized: (id: string) => void;
    updateProjectGeometry: (id: string, geom: Partial<Pick<ProjectWindowState, "left" | "top" | "width" | "height">>) => void;
    bringProjectToFront: (id: string) => void;

    // actions (derived)
    ensurePortfolioShown: () => void;
    openAbout: () => void;
    startScreensaver: () => void;
    triggerBSOD: () => void;
    shutdownAll: () => void;
    toggleMainMinimized: () => void;
    toggleAboutMinimized: () => void;
    toggleAboutMaximized: () => void;
    toggleAboutVisible: () => void;
};

const Ctx = createContext<UIState | null>(null);

export function UIStateProvider({ children }: { children: React.ReactNode }) {
    // main window
    // hide the main window by default — show it only when explicitly opened
    const [mainVisible, setMainVisible] = useState(false);
    const [mainMinimized, setMainMinimized] = useState(false);
    const [mainMaximized, setMainMaximized] = useState(false);

    // about window
    const [aboutVisible, setAboutVisible] = useState(false);
    const [aboutMinimized, setAboutMinimized] = useState(false);
    const [aboutMaximized, setAboutMaximized] = useState(false);

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
    const [, setZCounter] = useState(100);

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

    const setVolume = useCallback((v: number) => {
        _setVolume(v);
        if (v === 0) setMuted(true);
        else if (muted) setMuted(false);
    }, [muted]);

    // project actions
    const openProject: UIState["openProject"] = useCallback((id, meta) => {
        setZCounter((prevZ) => {
            const newZ = prevZ + 1;
            setProjects((cur) => {
                const exists = cur.find((p) => p.id === id);
                if (exists) {
                    return cur.map((p) =>
                        p.id === id ? { ...p, visible: true, minimized: false, maximized: false, url: meta?.url ?? p.url, zIndex: Math.max(p.zIndex ?? 0, newZ) } : p
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
                        left: 120,
                        top: 96,
                        width: 760,
                        height: 480,
                        zIndex: newZ,
                    },
                ];
            });
            return newZ;
        });
    }, []);

    const closeProject: UIState["closeProject"] = useCallback((id) => {
        setProjects((cur) => cur.filter((p) => p.id !== id));
    }, []);

    const setProjectMinimized = useCallback((id: string, v: boolean) => {
        setProjects((cur) => cur.map((p) => (p.id === id ? { ...p, minimized: v, visible: true } : p)));
    }, []);

    const toggleProjectMaximized = useCallback((id: string) => {
        setProjects((cur) => cur.map((p) => (p.id === id ? { ...p, maximized: !p.maximized, minimized: false } : p)));
    }, []);

    const updateProjectGeometry = useCallback((id: string, geom: Partial<Pick<ProjectWindowState, "left" | "top" | "width" | "height">>) => {
        setProjects((cur) => cur.map((p) => (p.id === id ? { ...p, ...geom } : p)));
    }, []);

    const bringProjectToFront = useCallback((id: string) => {
        setZCounter((prevZ) => {
            const newZ = prevZ + 1;
            setProjects((cur) => cur.map((p) => (p.id === id ? { ...p, zIndex: newZ } : p)));
            return newZ;
        });
    }, []);

    // simplified project controls - open/close only

    const value = useMemo<UIState>(() => ({
        mainVisible, setMainVisible,
        mainMinimized, setMainMinimized,
        mainMaximized, setMainMaximized,

        aboutVisible, setAboutVisible,
    aboutMinimized, setAboutMinimized,
    aboutMaximized, setAboutMaximized,

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
    setProjectMinimized,
    toggleProjectMaximized,
    updateProjectGeometry,
    bringProjectToFront,

        ensurePortfolioShown: () => {
            if (!mainVisible) setMainVisible(true);
            setMainMinimized(false);
        },
        openAbout: () => setAboutVisible(true),
        toggleAboutMinimized: () => setAboutMinimized((m) => !m),
        toggleAboutMaximized: () => setAboutMaximized((m) => !m),
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
        mainVisible, mainMinimized, mainMaximized, aboutVisible, aboutMinimized, aboutMaximized,
        screensaverOn, bsodOn, startOpen, calendarOpen, volumeOpen,
        time, online, volume, muted, projects, setVolume, bringProjectToFront, openProject, closeProject, setProjectMinimized, toggleProjectMaximized, updateProjectGeometry
    ]);

    return React.createElement(Ctx.Provider, { value }, children);

}

export function useUIState(): UIState {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useUIState must be used within UIStateProvider");
    return ctx;
}