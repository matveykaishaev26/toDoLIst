import s from "./Sidebar.module.scss";
import { typeSidebarTab } from "../../../types/types";
import SidebarTab from "./SidebarTab";
import SidebarMid from "./SidebarMid/SidebarMid";
import { useState, useRef, useEffect, useCallback } from "react";
type Props = {
  sidebarTabs: typeSidebarTab[];
  isSidebarOpen?: boolean;
};

export default function Sidebar({ sidebarTabs, isSidebarOpen }: Props) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(670);

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(
          e.clientX - sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
      className={`${s.sidebar} ${isSidebarOpen ? s.open : s.close} ${
        isResizing ? s.resizing : ""
      }`}
    >
      <div className={s.resizer} onMouseDown={startResizing}></div>
      <div className={s.sidebarTabs}>
        {sidebarTabs.slice(0, sidebarTabs.length / 2).map((tab) => (
          <SidebarTab key={tab.value} tab={tab} />
        ))}
      </div>
      <SidebarMid />
      <div className={s.sidebarTabs}>
        {sidebarTabs
          .slice(sidebarTabs.length / 2, sidebarTabs.length)
          .map((tab) => (
            <SidebarTab key={tab.value} tab={tab} />
          ))}
      </div>
    </div>
  );
}
