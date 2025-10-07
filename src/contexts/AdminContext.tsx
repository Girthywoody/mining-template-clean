import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  isEditMode: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setIsEditMode: (value: boolean) => void;
  login: () => void;
  logout: () => void;
  toggleEditMode: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('admin-authenticated');
    return saved === 'true';
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('admin-edit-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('admin-authenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('admin-edit-mode', isEditMode.toString());
  }, [isEditMode]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      isEditMode,
      setIsAuthenticated,
      setIsEditMode,
      login,
      logout,
      toggleEditMode
    }}>
      {children}
    </AdminContext.Provider>
  );
}; 