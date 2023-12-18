'use client'
import { createContext, useContext, useState } from 'react';
import { useTranslations } from 'next-intl';

export const Context = createContext<any>(null); 

export const useLanguage = () => {
  return useContext(Context);
}

export const ContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [language, setLanguage] = useState('en');

  if (language !== 'en' && language !== 'jp') {
    setLanguage('en');
  }

  return(
    <Context.Provider value={[language, setLanguage]}>
      {children}
    </Context.Provider>
  )
}