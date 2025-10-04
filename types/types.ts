
export interface Planet {
  name: string;
  image: string;
  diameter: number; // in km
  distanceFromSun: number; // in million km
  description: string;
  color: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}



