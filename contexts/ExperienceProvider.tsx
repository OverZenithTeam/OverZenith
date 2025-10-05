import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import {
  XP_REWARDS,
  DEFAULT_EXPERIENCE_DATA,
  getLevelFromXP,
  ASTEROID_ID,
  type ExperienceData
} from '../constants';
import { useXPContext } from './XPContext';

const STORAGE_KEY = 'overzenith_experience';

// Función helper para serializar Sets en localStorage
const serializeExperience = (data: ExperienceData): string => {
  return JSON.stringify({
    ...data,
    visitedEarthPoints: Array.from(data.visitedEarthPoints),
    visitedAsteroids: Array.from(data.visitedAsteroids),
    completedQuizQuestions: Array.from(data.completedQuizQuestions),
  });
};

// Función helper para deserializar Sets desde localStorage
const deserializeExperience = (jsonString: string): ExperienceData => {
  const parsed = JSON.parse(jsonString);
  return {
    ...parsed,
    visitedEarthPoints: new Set(parsed.visitedEarthPoints || []),
    visitedAsteroids: new Set(parsed.visitedAsteroids || []),
    completedQuizQuestions: new Set(parsed.completedQuizQuestions || []),
  };
};

interface ExperienceContextType {
  // Estados
  experienceData: ExperienceData;
  levelInfo: ReturnType<typeof getLevelFromXP>;

  // Acciones
  gainXP: (amount: number, reason?: string) => void;
  visitEarthPoint: (pointId: string) => void;
  visitAsteroid: () => void;
  answerQuizQuestion: (questionIndex: number) => void;
  completeQuiz: () => void;
  resetExperience: () => void;

  // Helpers
  hasVisitedEarthPoint: (pointId: string) => boolean;
  hasVisitedAnyAsteroid: () => boolean;
  hasAnsweredQuestion: (questionIndex: number) => boolean;
  hasCompletedQuiz: () => boolean;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

interface ExperienceProviderProps {
  children: ReactNode;
}

export const ExperienceProvider: React.FC<ExperienceProviderProps> = ({ children }) => {
  // Inicializar con localStorage inmediatamente (lazy initialization)
  const [experienceData, setExperienceData] = useState<ExperienceData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = deserializeExperience(stored);
        console.log('📦 Loaded experience from localStorage:', data);
        return data;
      }
    } catch (error) {
      console.error('Error loading experience data:', error);
    }
    console.log('📦 No saved data, using defaults');
    return DEFAULT_EXPERIENCE_DATA;
  });

  const { showXPGain } = useXPContext();
  const showXPGainRef = useRef(showXPGain);

  // Actualizar la referencia cuando cambie showXPGain
  useEffect(() => {
    showXPGainRef.current = showXPGain;
  }, [showXPGain]);

  // Guardar en localStorage cuando cambie la data
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, serializeExperience(experienceData));
    } catch (error) {
      console.error('Error saving experience data:', error);
    }
  }, [experienceData]);

  // Calcular información del nivel actual
  const levelInfo = getLevelFromXP(experienceData.totalXP);

  // Función para ganar XP
  const gainXP = useCallback((amount: number, reason?: string) => {
    setExperienceData(prev => ({
      ...prev,
      totalXP: prev.totalXP + amount
    }));

    // Trigger callback si existe
    if (showXPGainRef.current && reason) {
      showXPGainRef.current(amount, reason);
    }

    // Log para debugging (opcional)
    if (reason) {
      console.log(`🎉 Gained ${amount} XP for: ${reason}`);
    }
  }, []);

  // Función para visitar un punto de la Tierra (primera vez)
  const visitEarthPoint = useCallback((pointId: string) => {
    setExperienceData(prev => {
      if (prev.visitedEarthPoints.has(pointId)) {
        return prev; // Ya visitado, no ganar XP
      }

      const newVisitedPoints = new Set(prev.visitedEarthPoints);
      newVisitedPoints.add(pointId);

      // Ganar XP solo la primera vez
      const newData = {
        ...prev,
        visitedEarthPoints: newVisitedPoints,
        totalXP: prev.totalXP + XP_REWARDS.FIRST_TIME_EARTH_POINT
      };

      // Trigger callback
      if (showXPGainRef.current) {
        showXPGainRef.current(XP_REWARDS.FIRST_TIME_EARTH_POINT, `First visit to location`);
      }

      console.log(`🌍 First visit to ${pointId}! Gained ${XP_REWARDS.FIRST_TIME_EARTH_POINT} XP`);
      return newData;
    });
  }, []);

  // Función para hacer click en asteroide (primera vez)
  const visitAsteroid = useCallback(() => {
    setExperienceData(prev => {
      if (prev.visitedAsteroids.has(ASTEROID_ID)) {
        return prev; // Ya hizo click en asteroides antes
      }

      const newVisitedAsteroids = new Set(prev.visitedAsteroids);
      newVisitedAsteroids.add(ASTEROID_ID);

      const newData = {
        ...prev,
        visitedAsteroids: newVisitedAsteroids,
        totalXP: prev.totalXP + XP_REWARDS.FIRST_TIME_ASTEROID
      };

      // Trigger callback
      if (showXPGainRef.current) {
        showXPGainRef.current(XP_REWARDS.FIRST_TIME_ASTEROID, 'First asteroid discovery');
      }

      console.log(`☄️ First asteroid click! Gained ${XP_REWARDS.FIRST_TIME_ASTEROID} XP`);
      return newData;
    });
  }, []);

  // Función para responder correctamente una pregunta del quiz
  const answerQuizQuestion = useCallback((questionIndex: number) => {
    setExperienceData(prev => {
      if (prev.completedQuizQuestions.has(questionIndex)) {
        return prev; // Ya respondida correctamente antes
      }

      const newCompletedQuestions = new Set(prev.completedQuizQuestions);
      newCompletedQuestions.add(questionIndex);

      const newData = {
        ...prev,
        completedQuizQuestions: newCompletedQuestions,
        totalXP: prev.totalXP + XP_REWARDS.FIRST_TIME_QUIZ_QUESTION
      };

      // Trigger callback
      if (showXPGainRef.current) {
        showXPGainRef.current(XP_REWARDS.FIRST_TIME_QUIZ_QUESTION, `Correct answer #${questionIndex + 1}`);
      }

      console.log(`🧠 First correct answer for question ${questionIndex + 1}! Gained ${XP_REWARDS.FIRST_TIME_QUIZ_QUESTION} XP`);
      return newData;
    });
  }, []);

  // Función para completar el quiz completo
  const completeQuiz = useCallback(() => {
    setExperienceData(prev => {
      const isFirstTime = prev.quizCompletedCount === 0;
      const xpGained = isFirstTime ? XP_REWARDS.COMPLETE_QUIZ : XP_REWARDS.REPEAT_QUIZ;

      const newData = {
        ...prev,
        quizCompletedCount: prev.quizCompletedCount + 1,
        totalXP: prev.totalXP + xpGained
      };

      // Trigger callback
      if (showXPGainRef.current) {
        const reason = isFirstTime ? 'First quiz completion!' : 'Quiz completed again';
        showXPGainRef.current(xpGained, reason);
      }

      if (isFirstTime) {
        console.log(`🎯 First quiz completion! Gained ${xpGained} XP`);
      } else {
        console.log(`🔄 Quiz repeated! Gained ${xpGained} XP`);
      }

      return newData;
    });
  }, []);

  // Función para resetear la experiencia (útil para debugging)
  const resetExperience = useCallback(() => {
    setExperienceData(DEFAULT_EXPERIENCE_DATA);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: ExperienceContextType = {
    // Estados
    experienceData,
    levelInfo,

    // Acciones
    gainXP,
    visitEarthPoint,
    visitAsteroid,
    answerQuizQuestion,
    completeQuiz,
    resetExperience,

    // Helpers para verificar si ya se hizo algo
    hasVisitedEarthPoint: (pointId: string) => experienceData.visitedEarthPoints.has(pointId),
    hasVisitedAnyAsteroid: () => experienceData.visitedAsteroids.size > 0,
    hasAnsweredQuestion: (questionIndex: number) => experienceData.completedQuizQuestions.has(questionIndex),
    hasCompletedQuiz: () => experienceData.quizCompletedCount > 0,
  };

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = () => {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useExperienceContext must be used within an ExperienceProvider');
  }
  return context;
};
