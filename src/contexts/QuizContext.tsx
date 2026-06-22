"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface QuizAnswers {
  experience?: string;
  earnings?: string;
  motivation?: string;
  roleTypes?: string[];
  remoteValues?: string[];
  country?: string;
  countryFlag?: string;
  usAuth?: "yes" | "no";
  hoursPerWeek?: string;
  expertise?: string[];
  education?: string;
  professionalLevel?: string;
  lowerLevelRole?: string;
  lastRoleChange?: string;
  workSchedule?: string;
  teamSize?: string;
  companySize?: string;
  benefits?: string[];
  personality1?: string;
  personality2?: string;
  personality3?: string;
  email?: string;
}

interface QuizContextType {
  answers: QuizAnswers;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  currentStep: number;
  goToStep: (step: number) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | null>(null);
const STORAGE_KEY = "quiz_answers_v3";
const STEP_KEY = "quiz_step_v3";

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setAnswers(JSON.parse(stored));
      const step = localStorage.getItem(STEP_KEY);
      if (step) setCurrentStep(parseInt(step, 10));
    } catch {}
  }, []);

  const setAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    try { localStorage.setItem(STEP_KEY, String(step)); } catch {}
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(1);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);
    } catch {}
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswer, currentStep, goToStep, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
