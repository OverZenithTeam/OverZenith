
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

// ========== SISTEMA DE EXPERIENCIA ==========

export const XP_REWARDS = {
  FIRST_TIME_EARTH_POINT: 50,    // Primera vez que abres un punto en la Tierra
  FIRST_TIME_ASTEROID: 25,       // Primera vez que abres cualquier asteroide
  FIRST_TIME_QUIZ_QUESTION: 75,  // Primera vez que respondes correctamente una pregunta del quiz
  COMPLETE_QUIZ: 200,             // Completar todo el quiz por primera vez
  REPEAT_QUIZ: 50,                // Repetir el quiz (menor XP)
} as const;

// ID único para todos los asteroides
export const ASTEROID_ID = "asteroid-discovery";

export const LEVEL_SYSTEM = {
  BASE_XP_PER_LEVEL: 100,         // XP base necesaria para el primer nivel
  XP_MULTIPLIER: 1.5,             // Multiplicador para cada nivel (1.5x más XP cada nivel)
  MAX_LEVEL: 50,                  // Nivel máximo
} as const;

// Función para calcular XP necesaria para un nivel específico
export const getXPRequiredForLevel = (level: number): number => {
  if (level <= 1) return 0;
  return Math.floor(LEVEL_SYSTEM.BASE_XP_PER_LEVEL * Math.pow(LEVEL_SYSTEM.XP_MULTIPLIER, level - 2));
};

// Función para calcular XP total necesaria hasta un nivel
export const getTotalXPForLevel = (level: number): number => {
  let totalXP = 0;
  for (let i = 2; i <= level; i++) {
    totalXP += getXPRequiredForLevel(i);
  }
  return totalXP;
};

// Función para calcular el nivel basado en XP total
export const getLevelFromXP = (totalXP: number): { level: number; currentLevelXP: number; xpForNextLevel: number } => {
  let level = 1;
  let accumulatedXP = 0;

  while (level < LEVEL_SYSTEM.MAX_LEVEL) {
    const xpNeededForNextLevel = getXPRequiredForLevel(level + 1);
    if (accumulatedXP + xpNeededForNextLevel > totalXP) {
      break;
    }
    accumulatedXP += xpNeededForNextLevel;
    level++;
  }

  const currentLevelXP = totalXP - accumulatedXP;
  const xpForNextLevel = getXPRequiredForLevel(level + 1);

  return { level, currentLevelXP, xpForNextLevel };
};

export type ExperienceData = {
  totalXP: number;
  visitedEarthPoints: Set<string>;  // IDs de puntos de la Tierra visitados
  visitedAsteroids: Set<string>;    // IDs de tipos de asteroides visitados (ahora usa Set con IDs)
  completedQuizQuestions: Set<number>;
  quizCompletedCount: number;
};

export const DEFAULT_EXPERIENCE_DATA: ExperienceData = {
  totalXP: 0,
  visitedEarthPoints: new Set(),
  visitedAsteroids: new Set(),
  completedQuizQuestions: new Set(),
  quizCompletedCount: 0,
};
