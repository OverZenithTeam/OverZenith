import { useEffect, useMemo, useRef } from "react";

// Nota: el paquete no exporta tipos TS completos.
// Usaremos "any" para el ref del globo.
type GlobeRef = any;

export default function GlobeView() {
  const globeRef = useRef<GlobeRef>(null);

  // Datos de ejemplo (cámbialos luego por tu API o lo que sea)
  const points = useMemo(
    () => [
      { name: "Madrid",  lat: 40.4168, lng: -3.7038 },
      { name: "Vigo",    lat: 42.2406, lng: -8.7207 },
      { name: "Caracas", lat: 10.4806, lng: -66.9036 },
      { name: "New York",lat: 40.7128, lng: -74.0060 }
    ],
    []
  );

  // Ajustes de cámara/controles después de montar
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // Posiciona la cámara inicial hacia Madrid (altitude = zoom)
    globe.pointOfView({ lat: 40.4168, lng: -3.7038, altitude: 1.8 }, 1500);

    // Controles de órbita
    const controls = globe.controls?.();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enablePan = false;
      controls.minDistance = 150;
      controls.maxDistance = 520;
    }

    // Ajusta DPR en móviles para no fundir GPU
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    globe.renderer?.().setPixelRatio(dpr);
  }, []);

  return (
    <div className="globe-wrap">
      {/* 
        Importación dinámica para evitar SSR y cargar solo en cliente.
        Vite no hace SSR por defecto, pero esto evita que el bundler
        evalúe WebGL antes de tiempo.
      */}
      <GlobeInner
        ref={globeRef}
        points={points}
      />
    </div>
  );
}

/** Separo el inner para asegurar carga solo en cliente */
function GlobeInner(
  { points }: { points: Array<{ name: string; lat: number; lng: number }> },
  ref?: React.Ref<GlobeRef>
) {
  // Cargamos el componente solo en cliente para evitar cualquier “window is not defined”
  const Globe = (globalThis as any).window
    ? require("react-globe.gl").default
    : null;

  if (!Globe) return null;

  return (
    <Globe
      ref={ref as any}
      // Texturas (puedes cambiarlas por las tuyas)
      globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
      bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
      showAtmosphere
      atmosphereAltitude={0.25}

      // Capa de puntos
      pointsData={points}
      pointLat="lat"
      pointLng="lng"
      pointAltitude={() => 0.01}
      pointRadius={0.5}
      pointLabel={(d: any) => `${d.name}\n(${d.lat.toFixed(2)}, ${d.lng.toFixed(2)})`}
      // Nota: si quieres color por punto, usa pointColor={(d)=>...}
    />
  );
}

// Necesario para forwardRef en el inner
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(GlobeInner as any) = Object.assign(
  (GlobeInner as any),
  { displayName: "GlobeInner" }
);
