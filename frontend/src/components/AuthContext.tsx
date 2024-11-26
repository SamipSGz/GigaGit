import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from 'firebase/auth'; // Import User type from Firebase

// Define the type for the context
interface AuthContextType {
  githubToken: string | null;
  setGithubToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [githubToken, setGithubToken] = useState<string | null>(
    localStorage.getItem('githubToken')
  );
  const [user, setUser] = useState<User | null>(null);

  // Persist token in localStorage
  useEffect(() => {
    if (githubToken) {
      localStorage.setItem('githubToken', githubToken);
    } else {
      localStorage.removeItem('githubToken');
    }
  }, [githubToken]);

  // Logout function to clear authentication state
  const logout = () => {
    setGithubToken(null);
    setUser(null);
    localStorage.removeItem('githubToken');
  };

  return (
    <AuthContext.Provider value={{ 
      githubToken, 
      setGithubToken, 
      user, 
      setUser,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};