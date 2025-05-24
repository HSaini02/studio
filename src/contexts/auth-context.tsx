
"use client";
import type { User } from '@/lib/types';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  showToast: (message: string, variant?: 'default' | 'destructive') => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking for persisted login state
    const storedUser = localStorage.getItem('bidverse-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name: string = "User") => {
    const newUser = { email, name, id: Date.now().toString() };
    setUser(newUser);
    localStorage.setItem('bidverse-user', JSON.stringify(newUser));
    showToast('Successfully logged in!');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bidverse-user');
    showToast('Successfully logged out.');
  };

  const showToastInternal = (message: string, variant: 'default' | 'destructive' = 'default') => {
    toast({
      title: variant === 'destructive' ? 'Error' : 'Success',
      description: message,
      variant: variant,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showToast: showToastInternal, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
