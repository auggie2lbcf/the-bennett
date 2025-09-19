// app/(site)/page.tsx or app/page.tsx
"use client";
import React from "react";
import {UIStateProvider} from "@/hooks/useUIState";
import {Desktop} from "@/components/Desktop";
import {Taskbar} from "@/components/Taskbar";

export default function Home() {
    return (
        <UIStateProvider>
            <div style={{position: "fixed", inset: 0, paddingBottom: 36, overflow: "hidden"}}>
                <Desktop/>
            </div>
            <Taskbar/>
        </UIStateProvider>
    );
}