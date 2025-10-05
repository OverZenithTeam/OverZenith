// src/constants/Info_maps.ts
export type PointInfo = {
  id: string;                // ID único para cada punto
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
  id: "atacama-radio-telescopes",
  name: "Radio Telescopes (Atacama, Chile)",
  lat: -23.029,
  lng: -67.755,
  title: "Radio Telescopes (Atacama, Chile)",
  sectionTitle: "How radio telescopes work and what information they collect",
  description:
    "In the Atacama Desert is ALMA, one of the largest radio telescopes in the world, composed of 66 antennas that observe the sky in millimeter and submillimeter waves.",
  bullets: [
    "They do not capture visible light, but radio waves from celestial bodies.",
    "The antennas focus the signal into a receiver that converts it into electrical impulses.",
    "Digital processing → images/maps at wavelengths invisible to the human eye.",
    "They study star formation, galaxy structure, pulsars, black holes, and quasars.",
    "They allow analyzing molecules in the interstellar medium (clues about planet formation).",
    "Through interferometry, multiple antennas operate as a 'super telescope' with higher resolution."
  ],
  source: "ALMA Observatory, NASA – Radio Astronomy"
},
{
  id: "kennedy-space-center",
  name: "Florida, USA",
  lat: 27.9944,
  lng: -81.7603,
  title: "Kennedy Space Center (Florida, USA)",
  sectionTitle: "How multistage rockets work and why they are essential for space",
  description:
    "The Apollo missions that took humans to the Moon launched from the Kennedy Space Center.",
  bullets: [
    "Multistage rockets overcome Earth's gravity efficiently.",
    "Each stage has its own fuel and engine.",
    "The first stage provides the initial thrust and then detaches to reduce weight.",
    "Subsequent stages continue accelerating until reaching orbit or escaping Earth's gravity.",
    "Allows transporting heavier payloads and saving fuel.",
    "The Apollo rockets used three stages to reach the Moon."
  ],
  source: "NASA – Kennedy Space Center",
  sourceUrl: "https://www.nasa.gov/centers/kennedy/home/index.html"
},
{
  id: "baikonur-cosmodrome",
  name: "Baikonur, Kazakhstan",
  lat: 45.9206,
  lng: 63.3422,
  title: "Baikonur Cosmodrome (Kazakhstan)",
  sectionTitle: "What is LEO and why it is important for crewed missions and satellites",
  description:
    "Yuri Gagarin, the first human in space, launched from Baikonur.",
  bullets: [
    "Low Earth Orbit (LEO) is located between 200 and 2,000 km above Earth.",
    "It requires less energy to reach orbit than higher orbits.",
    "It enables constant communication and direct observation of Earth.",
    "It is where the ISS and most observation satellites are located.",
    "It was chosen for the first crewed missions due to its safety and efficiency."
  ],
  source: "Wikipedia – Low Earth Orbit",
  sourceUrl: "https://en.wikipedia.org/wiki/Low_Earth_orbit"
},
{
  id: "kourou-space-centre",
  name: "Kourou, French Guiana",
  lat: 5.236,
  lng: -52.776,
  title: "Guiana Space Centre (Kourou)",
  sectionTitle: "Why the location affects the launch",
  description:
    "The ESA launches rockets from Kourou to take advantage of its location near the equator.",
  bullets: [
    "The Earth rotates from west to east, giving an extra speed of up to 460 m/s at the equator.",
    "Rockets require less fuel to reach orbital velocity.",
    "It allows carrying heavier payloads and increases efficiency.",
    "That's why many space centers are located at low latitudes."
  ],
  source: "Wikipedia – Guiana Space Centre",
  sourceUrl: "https://en.wikipedia.org/wiki/Guiana_Space_Centre?utm_source=chatgpt.com"
},
{
  id: "houston-mission-control",
  name: "Microgravity and NBL (Houston, USA)",
  lat: 29.5502,
  lng: -95.097,
  title: "Mission Control Center (Houston)",
  sectionTitle: "What is microgravity and how does it affect astronauts and experiments",
  description:
    "The Neutral Buoyancy Laboratory (NBL) is a giant pool where astronauts train movements simulating the weightlessness of space.",
  bullets: [
    "Microgravity occurs when an object is in continuous free fall around the Earth.",
    "It causes bodies to float and liquids to behave differently.",
    "Effects on the human body: loss of bone and muscle mass, changes in circulation and balance.",
    "It allows studying fluids, combustion, biology, and physics in a unique way.",
    "The NBL trains astronauts to move and use tools without weight and respond to emergencies."
  ],
  source: "NASA – NBL (Neutral Buoyancy Laboratory)",
  sourceUrl: "https://www.nasa.gov/johnson/neutral-buoyancy-laboratory/?utm_source=chatgpt.com"
},
{
  id: "hiroshima-bomb",
  name: "The Hiroshima Bomb",
  lat: 34.3853,
  lng: 132.4553,
  title: "The Hiroshima Bomb",
  sectionTitle: "Why did the Hiroshima bomb explode in the air and not upon hitting the ground?",
  bullets: [
    "Because it was designed to detonate approximately 600 meters above the city to maximize damage from the blast wave and heat, affecting more buildings and people than if it had exploded on the ground. Many think it 'fell and exploded on the ground,' but the altitude strategy was key to its devastation."
  ]
}
];
