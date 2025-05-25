
/**
 * @file AuthContext.jsx
 * @description Provides authentication context for the application.
 * Manages user state (logged in or out), and provides functions for login, logout,
 * and displaying toast notifications related to authentication.
 */
"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

/**
 * AuthContext
 * React context to store and provide authentication-related data and functions.
 * @type {React.Context<object|undefined>}
 */
export const AuthContext = createContext(undefined);

/**
 * AuthProvider component.
 * Wraps parts of the application that need access to authentication state.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  /**
   * State for the current user object. Null if no user is logged in.
   * @type {[object|null, Function]}
   */
  const [user, setUser] = useState(null);

  /**
   * State to indicate if authentication status is currently being loaded (e.g., from localStorage).
   * @type {[boolean, Function]}
   */
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast(); // Hook for displaying toast notifications

  /**
   * useEffect hook to simulate checking for persisted login state (e.g., from localStorage)
   * when the component mounts.
   */
  useEffect(() => {
    // In a real application, this might involve checking a secure cookie or making an API call
    // to verify an existing session.
    const storedUser = localStorage.getItem('fairbid-user'); // Using 'fairbid-user' for consistency
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('fairbid-user'); // Clear invalid data
      }
    }
    setIsLoading(false); // Finished loading authentication state
  }, []);

  /**
   * Logs in a user.
   * In a real app, this would involve API calls, password verification, etc.
   * For this demo, it sets the user state and stores it in localStorage.
   * @param {string} email - The user's email.
   * @param {string} [name="User"] - The user's name (defaults to "User").
   */
  const login = (email, name = "User") => {
    const newUser = { email, name, id: Date.now().toString() }; // Simple user object with a mock ID
    setUser(newUser);
    localStorage.setItem('fairbid-user', JSON.stringify(newUser));
    showToastInternal('Successfully logged in!');
  };

  /**
   * Logs out the current user.
   * Clears the user state and removes user data from localStorage.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('fairbid-user');
    showToastInternal('Successfully logged out.');
  };

  /**
   * Internal function to display toast notifications.
   * @param {string} message - The message to display in the toast.
   * @param {'default'|'destructive'} [variant='default'] - The style variant of the toast.
   */
  const showToastInternal = (message, variant = 'default') => {
    toast({
      title: variant === 'destructive' ? 'Error' : 'Success', // Set title based on variant
      description: message,
      variant: variant,
    });
  };

  // Provide the authentication state and functions to child components.
  return (
    <AuthContext.Provider value={{ user, login, logout, showToast: showToastInternal, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
