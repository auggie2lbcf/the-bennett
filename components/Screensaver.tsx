"use client";
import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { useUIState } from "@/hooks/useUIState";

export default function Screensaver() {
  const ui = useUIState();
  const onDismiss = useCallback(() => ui.setScreensaverOn(false), [ui]);

  useEffect(() => {
    const onKey = () => onDismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  if (!ui.screensaverOn) return null;

  return (
    <div className="win95-screensaver" onClick={onDismiss} role="button" tabIndex={0}>
      <div className="ss-center">
        <div className="ss-box" aria-hidden>
          <Image src="/window.svg" alt="win" width={40} height={40} className="ss-icon" />
        </div>
        <div className="ss-text">Press any key or click to exit</div>
      </div>

      <style jsx>{`
        .win95-screensaver{
          position: fixed; inset: 0; background: #000; z-index: 99999; display:flex; align-items:center; justify-content:center; font-family: 'Courier New', monospace; color: #00ffcc;
        }
        .ss-center{display:flex; flex-direction:column; align-items:center; gap:12px}
        .ss-box{ width:64px; height:64px; display:flex; align-items:center; justify-content:center; background:#c0c0c0; box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #808080; border:2px solid #000; image-rendering: pixelated; }
        .ss-icon{ width:40px; height:40px; image-rendering: pixelated; animation: win95-move 8s linear infinite alternate; }
        .ss-text{ color:#00ffcc; font-size:14px; text-shadow: 1px 1px 0 #002; }

        @keyframes win95-move{
          0%{ transform: translate(0,0) }
          20%{ transform: translate(20vw, -8vh) }
          40%{ transform: translate(-12vw, 10vh) }
          60%{ transform: translate(30vw, 20vh) }
          80%{ transform: translate(-20vw, -18vh) }
          100%{ transform: translate(0,0) }
        }
      `}</style>
    </div>
  );
}
