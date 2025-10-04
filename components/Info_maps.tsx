// src/constants/Info_maps.ts
export type PointInfo = {
  name: string;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  bullets?: string[];
  quiz?: { question: string; answer: string };
  source?: string;
  image?: string;
  sectionTitle?: string;
  sourceUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  gallery?: string[];
};


export const PLANET_POINTS: PointInfo[] = [
  {
  name: "Radiotelescopios (Atacama, Chile)",
  lat: -23.029,
  lng: -67.755,
  title: "Radiotelescopios (Atacama, Chile)",
  sectionTitle: "Cómo funcionan los radiotelescopios y qué información recogen", // <— AÑADIDO
  description:
    "En el desierto de Atacama se encuentra ALMA, uno de los radiotelescopios más grandes del mundo, compuesto por 66 antenas que observan el cielo en ondas milimétricas y submilimétricas.",
  bullets: [
    "No captan luz visible, sino ondas de radio de cuerpos celestes.",
    "Las antenas concentran la señal en un receptor que la convierte en impulsos eléctricos.",
    "Procesado digital → imágenes/mapas en longitudes de onda invisibles al ojo humano.",
    "Estudian formación de estrellas, estructura de galaxias, púlsares, agujeros negros y cuásares.",
    "Permiten analizar moléculas del medio interestelar (pistas sobre formación de planetas).",
    "Mediante interferometría, varias antenas operan como un 'súper telescopio' con más resolución."
  ],
  source: "ALMA Observatory, NASA – Radio Astronomy",
},
    {
  name: "Florida, USA",
  lat: 27.9944,
  lng: -81.7603,
  title: "Centro Espacial Kennedy (Florida, USA)",
  sectionTitle: "Cómo funcionan los cohetes multietapa y por qué son esenciales para el espacio",
  description:
    "Desde el Kennedy Space Center despegaron las misiones Apolo que llevaron al ser humano a la Luna.",
  bullets: [
    "Los cohetes multietapa superan la gravedad terrestre de manera eficiente.",
    "Cada etapa tiene su propio combustible y motor.",
    "La primera etapa proporciona el empuje inicial y luego se desprende para reducir peso.",
    "Las siguientes etapas continúan acelerando hasta alcanzar la órbita o escapar de la gravedad terrestre.",
    "Permite transportar cargas más pesadas y ahorrar combustible.",
    "Los cohetes Apolo usaron tres etapas para llegar a la Luna."
  ],
  source: "NASA – Kennedy Space Center",
  sourceUrl: "https://www.nasa.gov/centers/kennedy/home/index.html",
},
 {
  name: "Baikonur, Kazakhstan",
  lat: 45.9206,
  lng: 63.3422,
  title: "Cosmódromo de Baikonur (Kazajistán)",
  sectionTitle: "Qué es LEO y por qué es importante para misiones tripuladas y satélites",
  description:
    "Desde Baikonur despegó Yuri Gagarin, el primer humano en el espacio.",
  bullets: [
    "La órbita baja terrestre (LEO) se sitúa entre 200 y 2.000 km de altura.",
    "Requiere menos energía para alcanzar la órbita que otras más altas.",
    "Facilita comunicación constante y observación directa de la Tierra.",
    "Es donde se ubican la ISS y la mayoría de satélites de observación.",
    "Fue elegida para las primeras misiones tripuladas por su seguridad y eficiencia."
  ],
  source: "Wikipedia – Low Earth Orbit",
  sourceUrl: "https://en.wikipedia.org/wiki/Low_Earth_orbit",
},
  {
  name: "Kourou, Guayana Francesa",
  lat: 5.236,
  lng: -52.776,
  title: "Centro Espacial de Guayana (Kourou)",
  sectionTitle: "Por qué la ubicación afecta el lanzamiento",
  description:
    "La ESA lanza cohetes desde Kourou para aprovechar su ubicación cercana al ecuador.",
  bullets: [
    "La Tierra rota de oeste a este, dando una velocidad extra de hasta 460 m/s en el ecuador.",
    "Los cohetes necesitan menos combustible para alcanzar velocidad orbital.",
    "Permite transportar cargas más pesadas y aumentar la eficiencia.",
    "Por eso muchos centros espaciales se ubican en latitudes bajas."
  ],
  source: "Wikipedia – Guiana Space Centre",
  sourceUrl: "https://en.wikipedia.org/wiki/Guiana_Space_Centre?utm_source=chatgpt.com",
},
 {
  name: "Microgravedad y NBL (Houston, EE.UU.)",
  lat: 29.5502,
  lng: -95.097,
  title: "Centro de Control de Misión (Houston)",
  sectionTitle: "Qué es la microgravedad y cómo afecta a astronautas y experimentos",
  description:
    "El Neutral Buoyancy Laboratory (NBL) es una piscina gigante donde los astronautas entrenan movimientos simulando la ingravidez del espacio.",
  bullets: [
    "La microgravedad se produce cuando un objeto está en caída libre continua alrededor de la Tierra.",
    "Provoca que los cuerpos floten y los líquidos se comporten de manera distinta.",
    "Efectos en el cuerpo humano: pérdida de masa ósea y muscular, cambios en la circulación y equilibrio.",
    "Permite estudiar fluidos, combustión, biología y física de forma única.",
    "El NBL entrena a los astronautas a moverse y usar herramientas sin peso y responder a emergencias."
  ],
  source: "NASA – NBL (Neutral Buoyancy Laboratory)",
  sourceUrl: "https://www.nasa.gov/johnson/neutral-buoyancy-laboratory/?utm_source=chatgpt.com",
}
];