'use client'
import { createContext, useContext, useState } from 'react';
import { useTranslations } from 'next-intl';

export const Context = createContext<any>(null); 

export const useLanguage = () => {
  return useContext(Context);
}

export const ContextProvider = ({ children }: any) => {

  return(
    <Context.Provider value={{ }}>
      {children}
    </Context.Provider>
  )
}