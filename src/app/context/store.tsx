'use client'
import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

interface contextProps {
    setLanguage: Dispatch<SetStateAction<string>>
    language: string
}

const LanguageContext = createContext<contextProps>({
    setLanguage: () => {},
    language: 'en'
})

export const LanguageProvider = ({children}: {children: React.ReactNode}) => {
    const [language, setLanguage] = useState('en')

    return (
        <LanguageContext.Provider value={{setLanguage, language}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useGlobalContext = () => useContext(LanguageContext)