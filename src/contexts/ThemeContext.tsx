import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface ThemeContextType {
  dark: boolean; 
  toggle: () => void 
}

const ThemeContext = createContext<ThemeContextType>({ dark: true, toggle: () => {} })

export function ThemeProvider({ children }:{ children: ReactNode }) {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])
  return <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
