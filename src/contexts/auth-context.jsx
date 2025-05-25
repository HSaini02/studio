
"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  const login = (email, name = "User") => {
    const newUser = { email, name, id: Date.now().toString() };
    setUser(newUser);
    localStorage.setItem('bidverse-user', JSON.stringify(newUser));
    showToastInternal('Successfully logged in!');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bidverse-user');
    showToastInternal('Successfully logged out.');
  };

  const showToastInternal = (message, variant = 'default') => {
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
