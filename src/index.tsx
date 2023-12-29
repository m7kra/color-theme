import React, { useState, useEffect, createContext, useContext } from 'react';

type RawColorTheme = 'light' | 'dark' | 'system';
type ColorTheme = 'light' | 'dark';

export function useColorTheme(defaultTheme: RawColorTheme = 'system') {

    // To detect system theme, we try to match a CSS media query
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const [systemTheme, setSystemTheme] = useState<ColorTheme>(media.matches ? 'dark' : 'light');
    // User may override system theme
    const [userTheme, setUserTheme] = useState(defaultTheme);

    // Setup event listeners that will update the system theme if it changes
    // while the app is running
    function listener(event: MediaQueryListEvent) {
        setSystemTheme(event.matches ? 'dark' : 'light');
    }
    useEffect(() => {
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    })

    // Save user theme to local storage for persistence accross sessions
    function saveTheme(theme: ColorTheme) {
        localStorage.setItem('theme', theme);
        setUserTheme(theme);
    }
    useEffect(() => {
        const localTheme = localStorage.getItem('theme') as ColorTheme | null;
        if (localTheme) {
            setUserTheme(localTheme);
        }
    }, []);

    const result = userTheme === 'system' ? systemTheme : userTheme;
    return [result, saveTheme] as const;
}

// Create a context to share the theme state accross multiple components

const ColorThemeContext = createContext<ReturnType<typeof useColorTheme> | null>(null);

export function ColorThemeProvider({ children, theme = 'system' }: { children: React.ReactNode, theme?: RawColorTheme }) {
    return (
        <ColorThemeContext.Provider value={useColorTheme(theme)}>
            {children}
        </ColorThemeContext.Provider>
    );
}

export function useContextColorTheme() {
    const context = useContext(ColorThemeContext);
    if (!context) throw new Error('useContextColorTheme must be used within a ThemeProvider');
    return context;
}
