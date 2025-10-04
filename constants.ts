
import type { Planet, Question, AstronautSkin, Skin } from './types/types';

export const PLANET_DATA: Planet[] = [
  {
    name: 'Mercurio',
    image: 'https://picsum.photos/seed/mercury/400/400',
    diameter: 4879,
    distanceFromSun: 57.9,
    description: 'El planeta más pequeño y cercano al Sol, con temperaturas extremas.',
    color: '#a0a0a0',
  },
  {
    name: 'Venus',
    image: 'https://picsum.photos/seed/venus/400/400',
    diameter: 12104,
    distanceFromSun: 108.2,
    description: 'Conocido por su atmósfera tóxica y un intenso efecto invernadero.',
    color: '#e6a86e',
  },
  {
    name: 'Tierra',
    image: 'https://picsum.photos/seed/earth/400/400',
    diameter: 12742,
    distanceFromSun: 149.6,
    description: 'Nuestro hogar, el único planeta conocido con vida líquida y vida.',
    color: '#6e98e6',
  },
  {
    name: 'Marte',
    image: 'https://picsum.photos/seed/mars/400/400',
    diameter: 6779,
    distanceFromSun: 227.9,
    description: 'El "Planeta Rojo", conocido por sus desiertos fríos y casquetes polares.',
    color: '#e66e6e',
  },
  {
    name: 'Júpiter',
    image: 'https://picsum.photos/seed/jupiter/400/400',
    diameter: 139820,
    distanceFromSun: 778.5,
    description: 'El gigante gaseoso, el planeta más grande de nuestro sistema solar.',
    color: '#d8b8a0',
  },
  {
    name: 'Saturno',
    image: 'https://picsum.photos/seed/saturn/400/400',
    diameter: 116460,
    distanceFromSun: 1434.0,
    description: 'Famoso por su espectacular sistema de anillos de hielo y roca.',
    color: '#d8d0a0',
  },
  {
    name: 'Urano',
    image: 'https://picsum.photos/seed/uranus/400/400',
    diameter: 50724,
    distanceFromSun: 2871.0,
    description: 'Un gigante de hielo que rota de lado, con un eje de rotación inclinado.',
    color: '#a0c0d8',
  },
  {
    name: 'Neptuno',
    image: 'https://picsum.photos/seed/neptune/400/400',
    diameter: 49244,
    distanceFromSun: 4495.1,
    description: 'El planeta más distante del Sol, un mundo oscuro, frío y ventoso.',
    color: '#6e86e6',
  },
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    question: '¿Cuál es el planeta más grande del Sistema Solar?',
    options: ['Tierra', 'Júpiter', 'Saturno', 'Marte'],
    correctAnswer: 1,
  },
  {
    question: '¿Qué planeta es conocido como el "Planeta Rojo"?',
    options: ['Venus', 'Mercurio', 'Marte', 'Neptuno'],
    correctAnswer: 2,
  },
  {
    question: '¿Cuál es el planeta más cercano al Sol?',
    options: ['Mercurio', 'Venus', 'Tierra', 'Marte'],
    correctAnswer: 0,
  },
  {
    question: '¿Qué planeta es famoso por sus anillos?',
    options: ['Júpiter', 'Urano', 'Neptuno', 'Saturno'],
    correctAnswer: 3,
  },
];

export const ASTRONAUT_SKINS: AstronautSkin[] = [
  {
    id: "Default",
    name: "Default Astronaut",
    image: "./images/astronaut.png"
  },
  {
    id: "Colombia",
    name: "Colombian Astronaut",
    image: "./images/colombia.png"
  },
  {
    id: "España",
    name: "Spanish Astronaut",
    image: "./images/españa.png"
  },
  {
    id: "Venezuela",
    name: "Venezuelan Astronaut",
    image: "./images/venezuela.png"
  },
  {
    id: "42",
    name: "42 School Astronaut",
    image: "./images/astro42.png"
  },
  {
    id: "Cat",
    name: "Cat Astronaut",
    image: "./images/cat.png"
  }
];

export const SKIN_OPTIONS: Skin[] = ["Default", "Colombia", "España", "Venezuela", "42", "Cat"];
