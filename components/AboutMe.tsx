"use client";
import React from "react"; // Keep React import for JSX
import Win95Window from "@/components/Win95Window"; // Keep Win95Window import
import Image from "next/image"; // Add Image import

export default function AboutMe({ id, onClose }: { id?: string; onClose?: () => void }) {
  return (
    <Win95Window id={id} title="About Me" icon="computer" onClose={onClose}>
      <div style={{ padding: 12, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 6, overflow: 'hidden', boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.12)' }}>
            <Image src="/file.svg" alt="avatar" width={64} height={64} style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Austin Bennett</h3>
            <div style={{ color: '#333', fontSize: 13 }}>Software developer, tinkerer, and maker.</div>
          </div>
        </div>

        <hr style={{ margin: '12px 0' }} />

        <div style={{ fontSize: 13, lineHeight: 1.45 }}>
          <p>
            Hi — I&apos;m a developer who loves building playful UIs and experimenting with retro aesthetics. This demo shows a Windows 95-style window component that is draggable, resizable, and integrates with the taskbar.
          </p>
          <p>
            Find me on <a href="https://github.com/auggie2lbcf" target="_blank" rel="noreferrer">GitHub</a> or send an email to <a href="mailto:austin@example.com">austin@example.com</a>.
          </p>
        </div>
      </div>
    </Win95Window>
  );
}
