"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDrag } from "@/hooks/useDrag";
import { Win95Icon, AnyIconName } from "@/components/Win95Icons";
import { useUIState } from "@/hooks/useUIState";

type Props = {
  id?: string;
  title: string;
  icon?: AnyIconName;
  url?: string; // if provided, render an iframe
  children?: React.ReactNode;
  initial?: { x: number; y: number; width: number; height: number };
  onClose?: () => void;
};

export function Win95Window({ id, title, icon, url, children, initial, onClose }: Props) {
  const ui = useUIState();
  const project = id ? ui.projects.find((p) => p.id === id) : undefined;

  const defaultPos = project ? { x: project.left ?? 120, y: project.top ?? 96 } : (initial ? { x: initial.x, y: initial.y } : { x: 120, y: 80 });
  const { pos, setPos, onPointerDown } = useDrag(true, defaultPos);

  const defaultSize = project ? { w: project.width ?? 640, h: project.height ?? 380 } : { w: initial?.width ?? 640, h: initial?.height ?? 380 };
  const [size, setSize] = useState<{ w: number; h: number }>(defaultSize);

  // controlled by store when id is present
  const minimized = project ? !!project.minimized : false;

  // previous geometry for restore
  const prev = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  // Resize state
  const resizing = useRef(false);
  const resizeDir = useRef<string | null>(null);
  const resizeStart = useRef<{ mx: number; my: number; x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!resizing.current || !resizeStart.current || !resizeDir.current) return;
      const dx = e.clientX - resizeStart.current.mx;
      const dy = e.clientY - resizeStart.current.my;
      let nx = resizeStart.current.x;
      let ny = resizeStart.current.y;
      let nw = resizeStart.current.w;
      let nh = resizeStart.current.h;
      const minW = 200;
      const minH = 120;
      const dir = resizeDir.current;

      if (dir.includes("right")) {
        nw = Math.max(minW, resizeStart.current.w + dx);
      }
      if (dir.includes("left")) {
        nw = Math.max(minW, resizeStart.current.w - dx);
        nx = resizeStart.current.x + Math.min(dx, resizeStart.current.w - minW);
      }
      if (dir.includes("bottom")) {
        nh = Math.max(minH, resizeStart.current.h + dy);
      }
      if (dir.includes("top")) {
        nh = Math.max(minH, resizeStart.current.h - dy);
        ny = resizeStart.current.y + Math.min(dy, resizeStart.current.h - minH);
      }

      setPos({ x: nx, y: ny });
      setSize({ w: nw, h: nh });
    };

    const onUp = () => {
      resizing.current = false;
      resizeDir.current = null;
      resizeStart.current = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setPos]);

  const startResize = (dir: string) => (e: React.PointerEvent) => {
    resizing.current = true;
    resizeDir.current = dir;
    // capture pointer on the target so pointermove events are received even if pointer leaves
    try { (e.target as Element).setPointerCapture?.(e.pointerId); } catch {}
    resizeStart.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y, w: size.w, h: size.h };
    e.stopPropagation();
    e.preventDefault();
  };

  // handle maximize/minimize via store
  const onMinimize = () => {
    if (ui && id) ui.setProjectMinimized(id, true);
  };
  const onRestore = () => {
    if (ui && id) ui.setProjectMinimized(id, false);
  };
  const onToggleMax = () => {
    if (!ui || !id) return;
    ui.toggleProjectMaximized(id);
  };

  useEffect(() => {
    // if the project is maximized in store, expand to viewport
    if (project && project.maximized) {
      prev.current = { x: pos.x, y: pos.y, w: size.w, h: size.h };
      setPos({ x: 0, y: 0 });
      setSize({ w: window.innerWidth, h: window.innerHeight - 36 });
    } else if (project && project.left !== undefined && project.top !== undefined) {
      // sync to project geometry when it changes externally
      setPos({ x: project.left ?? pos.x, y: project.top ?? pos.y });
      setSize({ w: project.width ?? size.w, h: project.height ?? size.h });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.maximized]);

  // whenever pos or size change, schedule store geometry update (batched via rAF)
  const geomPending = useRef<{ left?: number; top?: number; width?: number; height?: number } | null>(null);
  const geomRaf = useRef<number | null>(null);
  const scheduleGeomFlush = useCallback(() => {
    if (geomRaf.current) return;
    geomRaf.current = requestAnimationFrame(() => {
      if (ui && id && geomPending.current) {
        ui.updateProjectGeometry(id, { left: geomPending.current.left, top: geomPending.current.top, width: geomPending.current.width, height: geomPending.current.height });
      }
      geomPending.current = null;
      if (geomRaf.current) { cancelAnimationFrame(geomRaf.current); geomRaf.current = null; }
    });
  }, [ui, id]);

  useEffect(() => {
    if (ui && id) {
      geomPending.current = { left: pos.x, top: pos.y, width: size.w, height: size.h };
      scheduleGeomFlush();
    }
  }, [pos.x, pos.y, size.w, size.h, ui, id, scheduleGeomFlush]);

  // close handler
  const doClose = () => {
    if (onClose) onClose();
  };

  const bringToFront = () => {
    if (ui && id) ui.bringProjectToFront(id);
  };

  // render
  return (
    <div
      id={id}
      className={`win95-window ${project && project.maximized ? "maximized" : ""}`}
      onPointerDown={bringToFront}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: minimized ? 34 : size.h,
        zIndex: project?.zIndex ?? (100 + (project && project.maximized ? 999 : 0)),
        display: "flex",
        flexDirection: "column",
      }}
      aria-label={title}
    >
  <div className="title-bar" onPointerDown={(e) => { onPointerDown(e); bringToFront(); }} role="toolbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon && <Win95Icon name={icon} />}
          <div className="title-bar-text">{title}</div>
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={() => (minimized ? onRestore() : onMinimize())} />
          <button aria-label={project && project.maximized ? "Restore" : "Maximize"} onClick={onToggleMax} />
          <button aria-label="Close" onClick={doClose} />
        </div>
      </div>

      {!minimized && (
        <div className="window-body" style={{ flex: 1, padding: 0, display: "flex", minHeight: 0 }}>
          {url ? (
            <iframe
              title={title}
              src={url}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 8 }}>{children}</div>
          )}
        </div>
      )}

      {/* resize handles: corners and sides */}
      {!(project && project.maximized) && (
        <>
          <div onPointerDown={startResize("top-left")} style={handleStyle("nwse-resize", 16, 16, undefined, undefined)} />
          <div onPointerDown={startResize("top")} style={handleStyle("ns-resize", '50%', 16, undefined, undefined)} />
          <div onPointerDown={startResize("top-right")} style={handleStyle("nesw-resize", 16, 16, undefined, undefined, true)} />

          <div onPointerDown={startResize("left")} style={handleStyle("ew-resize", 16, '50%', undefined, undefined)} />
          <div onPointerDown={startResize("right")} style={handleStyle("ew-resize", 16, '50%', undefined, undefined, true)} />

          <div onPointerDown={startResize("bottom-left")} style={handleStyle("nesw-resize", 16, 16, undefined, undefined, false, true)} />
          <div onPointerDown={startResize("bottom")} style={handleStyle("ns-resize", '50%', 16, undefined, undefined, false, true)} />
          <div onPointerDown={startResize("bottom-right")} style={handleStyle("nwse-resize", 16, 16, undefined, undefined, true, true)} />
        </>
      )}
    </div>
  );
}

function handleStyle(cursor: string, left: number | string, top: number | string, right?: number, bottom?: number, rightSide = false, bottomSide = false) {
  // larger hit area for touch: handles are bigger and extend outside the window edges
  const defaultSize = 36;
  const half = defaultSize / 2;
  const style: React.CSSProperties = {
    position: 'absolute',
    width: typeof left === 'number' ? left : defaultSize,
    height: typeof top === 'number' ? top : defaultSize,
    cursor,
    background: 'transparent',
    zIndex: 9999,
    touchAction: 'none',
  };
  if (rightSide) style.right = -half + 8; else style.left = typeof left === 'number' ? -half + 8 : `calc(${left} - ${half}px)`;
  if (bottomSide) style.bottom = -half + 8; else style.top = typeof top === 'number' ? -half + 8 : `calc(${top} - ${half}px)`;
  return style;
}

export default Win95Window;
