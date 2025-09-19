"use client";
import React from "react";
import { useUIState } from "@/hooks/useUIState";

export default function BSOD() {
  const ui = useUIState();
  if (!ui.bsodOn) return null;

  return (
    <div className="win95-bsod" role="alert">
      <div className="bsod-inner">
        <pre>
STOP: 0x0000007B

An unexpected condition has occurred. Windows has been shut down to prevent damage to your computer.

If this is the first time you&apos;ve seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:

- Check for viruses on your computer.
- Remove any newly installed hard drives or hard drive controllers.
- Check your hard drive to make sure it is properly configured and terminated.

If problems continue, disable or remove any newly installed hardware or software. Ask your hardware or software manufacturer for any Windows updates you might need.

Press the button below to dismiss.
        </pre>
        <button className="bsod-btn" onClick={() => ui.setBsodOn(false)}>Dismiss</button>
      </div>

      <style jsx>{`
        .win95-bsod{ position:fixed; inset:0; background:#0000aa; color:#fff; z-index:100000; display:flex; align-items:center; justify-content:center; font-family: 'Courier New', monospace; }
        .bsod-inner{ max-width:900px; padding:24px }
        pre{ white-space:pre-wrap; font-size:14px; line-height:1.4 }
        .bsod-btn{ margin-top:18px; padding:8px 12px; background:#fff; color:#000; border:none; cursor:pointer }
      `}</style>
    </div>
  );
}
