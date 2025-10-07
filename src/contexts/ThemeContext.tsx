import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'simple' | 'premium';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check template context first
    const templateContext = sessionStorage.getItem('templateContext');
    if (templateContext === 'construction') {
      return 'premium';
    } else if (templateContext === 'mining') {
      return 'simple';
    }
    
    // Check localStorage, then default to 'premium'
    const savedTheme = localStorage.getItem('website-theme') as Theme;
    return savedTheme || 'premium';
  });

  useEffect(() => {
    localStorage.setItem('website-theme', theme);
    // Add theme class to body for global styling
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Listen for template context changes
  useEffect(() => {
    const handleStorageChange = () => {
      const templateContext = sessionStorage.getItem('templateContext');
      if (templateContext === 'construction') {
        setTheme('premium');
      } else if (templateContext === 'mining') {
        setTheme('simple');
      }
    };

    // Listen for sessionStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also check on mount
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'simple' ? 'premium' : 'simple');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
