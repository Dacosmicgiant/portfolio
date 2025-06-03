// useThemeStore.js

import { create } from "zustand";

// Get initial theme from localStorage or default to a vibrant theme
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("portfolio-theme");
  return savedTheme || "synthwave"; // Default to a more colorful theme
};

// Apply theme to document
const applyTheme = (theme) => {
  // Remove all existing theme classes
  const htmlElement = document.documentElement;
  htmlElement.classList.forEach(className => {
    if (className.startsWith('theme-')) {
      htmlElement.classList.remove(className);
    }
  });
  
  // Set the data-theme attribute (DaisyUI standard)
  htmlElement.setAttribute('data-theme', theme);
  
  // Force a repaint to ensure theme changes are applied
  document.body.style.display = 'none';
  document.body.offsetHeight; // Trigger reflow
  document.body.style.display = '';
  
  // Store in localStorage
  localStorage.setItem("portfolio-theme", theme);
};

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  
  setTheme: (newTheme) => {
    // Apply theme immediately
    applyTheme(newTheme);
    
    // Update store state
    set({ theme: newTheme });
    
    // Optional: Add a small delay to ensure smooth transition
    setTimeout(() => {
      // Dispatch a custom event for components that might need to respond to theme changes
      window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: newTheme } 
      }));
    }, 100);
  },
  
  // Get theme colors (useful for dynamic styling)
  getThemeColors: () => {
    const theme = get().theme;
    return {
      primary: getComputedStyle(document.documentElement).getPropertyValue('--p'),
      secondary: getComputedStyle(document.documentElement).getPropertyValue('--s'),
      accent: getComputedStyle(document.documentElement).getPropertyValue('--a'),
      neutral: getComputedStyle(document.documentElement).getPropertyValue('--n'),
      base100: getComputedStyle(document.documentElement).getPropertyValue('--b1'),
      base200: getComputedStyle(document.documentElement).getPropertyValue('--b2'),
      base300: getComputedStyle(document.documentElement).getPropertyValue('--b3'),
    };
  },
  
  // Initialize theme on app start
  initializeTheme: () => {
    const currentTheme = get().theme;
    applyTheme(currentTheme);
  }
}));