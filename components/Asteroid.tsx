import React, { useEffect, useMemo, useRef } from "react";

type Bounds = {
  width: number;
  height: number;
};

type Props = {
  size?: number | [number, number];
  speed?: number;
  initialX?: number;
  initialY?: number;
  vx?: number;
  vy?: number;
  rotate?: boolean;
  rotSpeed?: number;
  zIndex?: number;
  onBounce?: (side: "left" | "right" | "top" | "bottom") => void;
  src?: string;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export const Asteroide: React.FC<Props> = ({
  size = [40, 120],
  speed = 1.2,
  initialX,
  initialY,
  vx,
  vy,
  rotate = true,
  rotSpeed = 0.4,
  zIndex = 1,
  onBounce,
  src = "images/asteoride.png",
}) => {
  const prefersReduced = useMemo(
    () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const boundsRef = useRef<Bounds>({ width: window.innerWidth, height: window.innerHeight });
  const resizeId = useRef<number | null>(null);
  useEffect(() => {
    const onResize = () => {
      if (resizeId.current) cancelAnimationFrame(resizeId.current);
      resizeId.current = requestAnimationFrame(() => {
        boundsRef.current = { width: window.innerWidth, height: window.innerHeight };
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sizePx = useMemo(() => {
    return Array.isArray(size) ? Math.round(rand(size[0], size[1])) : size;
  }, [size]);

  const x = useRef<number>(
    initialX ?? rand(0, Math.max(1, boundsRef.current.width - sizePx))
  );
  const y = useRef<number>(
    initialY ?? rand(0, Math.max(1, boundsRef.current.height - sizePx))
  );
  const velX = useRef<number>(
    vx ?? (Math.random() < 0.5 ? -1 : 1) * rand(speed * 0.6, speed * 1.4)
  );
  const velY = useRef<number>(
    vy ?? (Math.random() < 0.5 ? -1 : 1) * rand(speed * 0.6, speed * 1.4)
  );
  const rot = useRef<number>(rand(0, 360));
  const rotVel = useRef<number>((Math.random() < 0.5 ? -1 : 1) * rotSpeed);

  const elRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const step = () => {
      const { width, height } = boundsRef.current;

      x.current += velX.current;
      y.current += velY.current;

      if (x.current <= 0) {
        x.current = 0;
        velX.current = Math.abs(velX.current);
        onBounce?.("left");
      } else if (x.current + sizePx >= width) {
        x.current = width - sizePx;
        velX.current = -Math.abs(velX.current);
        onBounce?.("right");
      }

      if (y.current <= 0) {
        y.current = 0;
        velY.current = Math.abs(velY.current);
        onBounce?.("top");
      } else if (y.current + sizePx >= height) {
        y.current = height - sizePx;
        velY.current = -Math.abs(velY.current);
        onBounce?.("bottom");
      }

      velX.current = clamp(velX.current + rand(-0.02, 0.02), -4, 4);
      velY.current = clamp(velY.current + rand(-0.02, 0.02), -4, 4);

      if (rotate) {
        rot.current += rotVel.current;
      }

      const el = elRef.current;
      if (el) {
        el.style.transform = `translate3d(${x.current}px, ${y.current}px, 0) rotate(${rot.current}deg)`;
      }

      rafId.current = requestAnimationFrame(step);
    };

    rafId.current = requestAnimationFrame(step);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReduced, rotate, sizePx, onBounce]);

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    width: sizePx,
    height: sizePx,
    pointerEvents: "none",
    willChange: "transform",
    zIndex,
    transform: `translate3d(${x.current}px, ${y.current}px, 0) rotate(${rot.current}deg)`,
  };

  return (
    <div ref={elRef} style={baseStyle} aria-hidden>
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          userSelect: "none",
          display: "block",
        }}
      />
    </div>
  );
};

export default Asteroide;
