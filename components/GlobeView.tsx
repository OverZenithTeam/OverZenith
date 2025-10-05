import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { PLANET_POINTS,PointInfo } from "./Info_maps";
import { useExperienceContext } from "../contexts/ExperienceProvider";
import { useXPContext } from "../contexts/XPContext";

type GlobeRef = any;

type PointItem = PointInfo;
type CustomItem = {
  lat: number;
  lng: number;
  alt: number;
  color: number;
  name?: string;
};

const points = PLANET_POINTS


/* ====== helpers ====== */
function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}
function latLngToXYZ(lat: number, lng: number, radius: number) {
  const phi = deg2rad(90 - lat);
  const theta = deg2rad(lng + 180);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return { x, y, z };
}
function createCustomMarker(color: number) {
  const geometry = new THREE.SphereGeometry(0.05, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

/* ====== Modal super simple ====== */
function Modal({
  title,
  children,
  onClose
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  // Cerrar con Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // bloquear scroll del body
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Dialog */}
    <div
  className="relative rounded-2xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden font-mono p-10"
  style={{ backgroundColor: "#282c34", color: "white" }}
>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600 -mx-10 -mt-10 mb-6">
          <h2 id="modal-title" className="text-xl font-bold text-white">
            {title}
          </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-md text-white hover:bg-gray-700"
          aria-label="Close"
        >
          ✕
          </button>
        </div>
        <div className="text-sm text-gray-300">{children}</div>
       <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#282c34] transition"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
}

export default function GlobeView() {
  const globeRef = useRef<GlobeRef>(null);
  const { showXPGain } = useXPContext();
  const { visitEarthPoint } = useExperienceContext();
  const [selected, setSelected] = useState<
    | { type: "point"; data: PointItem }
    | { type: "custom"; data: CustomItem }
    | null
  >(null);

  const setCanvasCursor = useCallback((cursor: string) => {
    const canvas = globeRef.current?.domElement?.();
    if (canvas) canvas.style.cursor = cursor;
  }, []);

  const customLayer = useMemo<CustomItem[]>(
    () => [
      { name: "Madrid", lat: 40.4168, lng: -3.7038, color: 0xff4d4d, alt: 0.02 },
      { name: "Vigo", lat: 42.2406, lng: -8.7207, color: 0x00d4ff, alt: 0.02 }
    ],
    []
  );

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const mat = globe.globeMaterial?.();
    if (mat) {
      mat.emissive = new THREE.Color("#334155");
      mat.emissiveIntensity = 0.28;
    }
    globe.pointOfView({ lat: 0, lng: 0, altitude: 3.2 }, 1200);
    const radius = globe.getGlobeRadius?.() ?? 100;
    const controls = globe.controls?.();
    if (controls) {
      controls.target.set(0, radius * 0.5, 0);
      controls.update();
      controls.autoRotate = false;
      controls.enablePan = false;
      controls.minDistance = radius * 1.5;
      controls.maxDistance = radius * 6;
    }
    const renderer = globe.renderer?.();
    if (renderer) renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }, []);

  return (
    <div className="w-full h-full min-h-screen" style={{ width: "100vw", height: "100vh" }}>
      <Globe
        ref={globeRef as any}
        enablePointerInteraction
        globeImageUrl="../images/earth-blue-marble.jpg"
		//
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        showAtmosphere
        atmosphereColor="aliceblue"
        atmosphereAltitude={0.18}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={() => 0.01}
        pointRadius={0.5}
        pointLabel={(d: any) =>
          `${(d as PointItem).name}\n(${(d as PointItem).lat.toFixed(2)}, ${(d as PointItem).lng.toFixed(2)})`
        }
        pointsMerge={false}
        onPointHover={(p: any) => setCanvasCursor(p ? "pointer" : "grab")}
        onPointClick={(p: any, _event: MouseEvent) => {
          const pointData = p as PointItem;
          // Ganar XP la primera vez que se visita este punto usando su ID único
          visitEarthPoint(pointData.id);
          setSelected({ type: "point", data: pointData });
        }}
        customLayerData={customLayer}
        customThreeObject={(d: any) => {
          const customData = d as CustomItem;
          const mesh = createCustomMarker(customData.color);
          mesh.userData = { lat: customData.lat, lng: customData.lng, alt: customData.alt, name: customData.name, color: customData.color };
          return mesh;
        }}
        customThreeObjectUpdate={(obj: any, _d: any, globeRadius?: number) => {
          const r = globeRadius ?? globeRef.current?.getGlobeRadius?.() ?? 100;
          const { lat, lng, alt } = obj.userData as CustomItem;
          const { x, y, z } = latLngToXYZ(lat, lng, r * (1 + alt));
          obj.position.set(x, y, z);
          obj.lookAt(0, 0, 0);
        }}
        onCustomLayerHover={(obj: any | null) => setCanvasCursor(obj ? "pointer" : "grab")}
        onCustomLayerClick={(obj: any, _event: MouseEvent) => {
          const data = obj?.userData as CustomItem | undefined;
          if (data) setSelected({ type: "custom", data });
        }}
      />

      {/* === Modal === */}
      {selected && (
        <Modal
          title={
            selected.type === "point"
              ? (selected.data.title ?? selected.data.name)
                : (selected.data.name ?? "Ubicación")
}
          onClose={() => setSelected(null)}
                  >
                    {selected.type === "point" ? (
            <article className="space-y-4">
              {selected.data.image && (
                <img
                  src={selected.data.image}
                  alt={selected.data.title ?? selected.data.name}
                  className="w-full rounded-xl shadow"
                  loading="lazy"
                />
              )}

              {/* Descripción */}
              {selected.data.description && (
                <p className="text-sm text-gray-300">{selected.data.description}</p>
              )}
              <h3 className="font-semibold text-white mb-2">
                {selected.data.sectionTitle}
              </h3>
              {/* Bullets pedagógicos */}
              {selected.data.bullets?.length ? (
                <section>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                  {selected.data.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </section>
              ) : null}
              {/* Lat/Lng + fuente */}
              <div className="text-xs text-gray-400">
                <p>
                  Lat: <span className="font-mono">{selected.data.lat.toFixed(3)}</span> ·
                  Lng: <span className="font-mono">{selected.data.lng.toFixed(3)}</span>
                </p>
                {selected.data.source && (
                  <p className="mt-1">
                   <span className="font-semibold text-gray-200">Font:</span> {selected.data.source}
                  </p>
                )}
              </div>
            </article>
          ) : (

            <div className="space-y-2">
              <p className="font-medium">Tipo: Custom</p>
              <p>
                Lat: <span className="font-mono">{selected.data.lat.toFixed(4)}</span>
              </p>
              <p>
                Lng: <span className="font-mono">{selected.data.lng.toFixed(4)}</span>
              </p>
              <p>
                Alt: <span className="font-mono">{selected.data.alt}</span>
              </p>
              <p className="flex items-center gap-2">
                Color:
                <span
                  className="inline-block h-4 w-4 rounded"
                  style={{ background: `#${selected.data.color.toString(16).padStart(6, "0")}` }}
                  aria-label="color"
                />
              </p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
