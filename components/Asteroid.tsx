import React, { useEffect, useMemo, useRef, useState } from "react";
import { useExperienceContext } from "../contexts/ExperienceProvider";
import { useXPContext } from "../contexts/XPContext";

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
  infoText?: string;
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
  infoText = "Small asteroids and meteoroids constantly enter Earth's atmosphere, but most burn up before reaching the ground, protecting us from larger impacts.",
}) => {
  const { showXPGain } = useXPContext();
  const { visitAsteroid, hasVisitedAnyAsteroid } = useExperienceContext();
  const [showModal, setShowModal] = useState(false);

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

  const handleClick = () => {
    visitAsteroid();
    setShowModal(true);
  };

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: `${sizePx}px`,
    height: `${sizePx}px`,
    zIndex,
    cursor: "pointer",
    transform: `translate3d(${x.current}px, ${y.current}px, 0) rotate(${rot.current}deg)`,
  };

  return (
    <>
      <div
        ref={elRef}
        style={baseStyle}
        aria-hidden
        onClick={handleClick}
      >
        <img
          src={src}
          alt="Asteroid"
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-bold mb-3">Curiosities about asteroids 🪐</h2>
            <p className="mb-4">{infoText}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Asteroide;
