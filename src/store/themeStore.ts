import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ITheme {
    theme: 'light' | 'dark',
    setTheme: (userInfo: 'light' | 'dark') => void,
}

export const useThemeStore = create<ITheme>()(
    persist(
        (set) => ({
            theme: "light",
            setTheme: (theme) => set({ theme: theme }),
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    )
)
