// src/components/GlobeView.tsx
import { useEffect, useMemo, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

type GlobeRef = any;

/* ====== helpers para convertir lat/lng a coordenadas XYZ ====== */
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

/* ====== crea un marcador personalizado (objeto Three.js) ====== */
function createCustomMarker(color: number) {
  const geometry = new THREE.SphereGeometry(0.05, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

export default function GlobeView() {
  const globeRef = useRef<GlobeRef>(null);

  // puntos normales (API de react-globe.gl)
  const points = useMemo(
	() => [
		{ name: "Florida, USA", lat: 27.9944, lng: -81.7603 },
		{ name: "Baikonur, Kazakhstan", lat: 45.9206, lng: 63.3422 },
		{ name: "Chile", lat: -33.4489, lng: -70.6693 },
		{ name: "Houston, USA", lat: 29.5502, lng: -95.0970 },
		{ name: "Kourou Space Center, French Guiana", lat: 5.2360, lng: -52.7760 },
	],
	[]
 );

  // datos para los objetos custom (nuestras esferas flotantes)
  const customLayer = useMemo(
    () => [
      { lat: 40.4168, lng: -3.7038, color: 0xff4d4d, alt: 0.02 }, // Madrid
      { lat: 42.2406, lng: -8.7207, color: 0x00d4ff, alt: 0.02 }, // Vigo
    ],
    []
  );

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // iluminar la textura nocturna (emissive)
    const mat = globe.globeMaterial?.();
    if (mat) {
      mat.emissive = new THREE.Color("#334155");
      mat.emissiveIntensity = 0.28;
    }

    // cámara Cupola
    // Cámara bastante lejos
	globe.pointOfView(
	{ lat: 0, lng: 0, altitude: 3.2 }, // puedes ajustar 3.0–4.0 según tu pantalla
	1200
	);

	// Límites de zoom y centrado
	const radius = globe.getGlobeRadius?.() ?? 100;
	const controls = globe.controls?.();
	if (controls) {
	// sube el target a la mitad del radio para “bajar” la esfera
	controls.target.set(0, radius * 0.5, 0);
	controls.update();

	controls.autoRotate = false;
	controls.enablePan = false;
	controls.minDistance = radius * 1.5;
	controls.maxDistance = radius * 6;
	}


    // rendimiento móvil
    const renderer = globe.renderer?.();
    if (renderer) renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Globe
        ref={globeRef as any}
        // texturas y atmósfera
        globeImageUrl="../images/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        showAtmosphere
        atmosphereColor="aliceblue"
        atmosphereAltitude={0.18}

        // puntos normales
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={() => 0.01}
        pointRadius={0.5}
        pointLabel={(d: any) =>
          `${d.name}\n(${d.lat.toFixed(2)}, ${d.lng.toFixed(2)})`
        }

        // ====== capa custom ======
        customLayerData={customLayer}
        customThreeObject={(d: any) => {
          // devolvemos un objeto Three para cada elemento
          const mesh = createCustomMarker(d.color);
          // guardamos sus coords para el updater
          mesh.userData = { lat: d.lat, lng: d.lng, alt: d.alt };
          return mesh;
        }}
        customThreeObjectUpdate={(obj: any, d: any, globeRadius?: number) => {
          const r = globeRadius ?? globeRef.current?.getGlobeRadius?.() ?? 100;
          const { lat, lng, alt } = obj.userData;
          const { x, y, z } = latLngToXYZ(lat, lng, r * (1 + alt));
          obj.position.set(x, y, z);
          obj.lookAt(0, 0, 0);
        }}
      />
    </div>
  );
}
