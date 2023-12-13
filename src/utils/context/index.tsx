'use client'
import { createContext, useContext, useState } from 'react';

export const Context = createContext<any>(null); 

export const useLanguage = () => {
  return useContext(Context);
}

export const ContextProvider = ({ children }: any) => {
  const [language, setLanguage] = useState('en');

  const checkLang = () => {
    if (language === 'en' || language === 'jp') {
      setLanguage(language);
    } else {
      setLanguage('en');
      console.log('Language not supported, defaulting to English');
    }
  }

  return(
    <Context.Provider value={{ language, setLanguage: checkLang }}>
      {children}
    </Context.Provider>
  )
}