import { createContext, useContext } from 'react'

export enum Theme {
  // eslint-disable-next-line no-unused-vars
  Red = '#ff4d4d',
  // eslint-disable-next-line no-unused-vars
  Blue = '#1aa3ff',
  // eslint-disable-next-line no-unused-vars
  Purple = '#e600ac',
  // eslint-disable-next-line no-unused-vars
  Green = '#009900',
}
//type
export type ThemeContextType = {
  theme: Theme
  setTheme: (Theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Purple,
  //setTheme: (theme) => console.warn('no theme provider'),
  setTheme: (theme) => theme,
})
//hook using useCotext hook
export const useTheme = () => useContext(ThemeContext)
