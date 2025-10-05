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
  id: "baikonur-cosmodrome-nasa",
  name: "Baikonur, Kazakhstan",
    lat: 46.0,
  lng: 63.6,
  title: "Baikonur Cosmodrome (Kazakhstan)",
  sectionTitle: "Baikonur in NASA’s Earth imagery and its role",
  description:
    "NASA’s Terra satellite captured images of the Baikonur Cosmodrome, which is used for Russian crewed missions, geostationary, lunar, planetary and Earth-observing launches. :contentReference[oaicite:1]{index=1}",
  bullets: [
    "The site is used for all Russian crewed missions, per NASA imagery. :contentReference[oaicite:2]{index=2}",
    "Baikonur supports launches of lunar, planetary, and Earth-observing missions as well. :contentReference[oaicite:3]{index=3}",
    "It was rented by Russia from Kazakhstan and is under Russian administration. :contentReference[oaicite:4]{index=4}",
    "The NASA image covers ~15×23 km area showing the launch complex. :contentReference[oaicite:5]{index=5}",
    "It was originally established in the Soviet era, evolving into a major international launch site. :contentReference[oaicite:6]{index=6}"
  ],
  source: "NASA Science / Photojournal",
  sourceUrl: "https://science.nasa.gov/photojournal/baikonur-cosmodrome-kazakhstan"
},
{
  id: "kennedy-space-center",
  name: "Merritt Island, Florida, USA",
  lat: 28.5721,
  lng: -80.6480,
  title: "Kennedy Space Center (NASA)",
  sectionTitle: "How NASA uses its equatorial advantage",
  description:
    "The Kennedy Space Center is NASA’s primary launch site for human spaceflight, located on Florida’s east coast to take advantage of Earth’s rotation and allow safe launches over the Atlantic Ocean.",
  bullets: [
    "Florida’s proximity to the equator gives rockets a natural boost from Earth’s rotation, improving launch efficiency.",
    "Launches are directed eastward over the Atlantic Ocean to avoid populated areas.",
    "Home to Launch Complexes 39A and 39B, used for Apollo, Space Shuttle, and Artemis missions.",
    "The Vehicle Assembly Building (VAB) is one of the largest buildings in the world, where rockets are assembled vertically."
  ],
  source: "NASA – Kennedy Space Center Overview",
  sourceUrl: "https://www.nasa.gov/kennedy"
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
  sourceUrl: "https://www.nasa.gov/johnson/neutral-buoyancy-laboratory"
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
