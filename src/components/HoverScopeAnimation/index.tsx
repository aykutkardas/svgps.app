import { useRef, useEffect } from "react";

import styles from "./HoverScopeAnimation.module.css";

const HoverScopeAnimation = () => {
  const hoverScopeEl = useRef<HTMLDivElement>();

  useEffect(() => {
    document.body.addEventListener("mousemove", (e) => {
      if (!hoverScopeEl.current) return;
      hoverScopeEl.current.style.top = e.clientY + "px";
      hoverScopeEl.current.style.left = e.clientX + "px";
    });
  }, []);

  return (
    <div className={styles.HoverScopeOverlay}>
      <div ref={hoverScopeEl} className={styles.HoverScope} />
    </div>
  );
};

export default HoverScopeAnimation;
