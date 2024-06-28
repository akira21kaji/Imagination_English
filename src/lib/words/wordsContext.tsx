'use client';

import { Dispatch, ReactNode, SetStateAction, useContext, useState,createContext  } from "react";

type wordsContextType = {
  inputWord: string;
  setInputWord: Dispatch<SetStateAction<string>>;
  generateExplanation: string | null;
  setGenerateExplanation: Dispatch<SetStateAction<string | null>>;
}

const wordsContext = createContext<wordsContextType | null>(null);

export const WordsProvider = ({children}: {children: ReactNode}) => {
  const [inputWord, setInputWord] = useState<string>('');
  const [generateExplanation, setGenerateExplanation] = useState<string | null>(null);

  return <wordsContext.Provider value={{inputWord, setInputWord, generateExplanation, setGenerateExplanation}}>
    {children}
  </wordsContext.Provider>
  };

  export function useWordsContext() {
    return useContext(wordsContext);
  }