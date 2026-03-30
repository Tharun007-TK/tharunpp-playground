import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = window.localStorage.getItem("tharunpp-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    if (storedTheme === "light" || (!storedTheme && prefersLight)) {
      setIsDark(false);
      document.documentElement.classList.add("light-theme");
    } else {
      setIsDark(true);
      document.documentElement.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add("light-theme");
      window.localStorage.setItem("tharunpp-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.remove("light-theme");
      window.localStorage.setItem("tharunpp-theme", "dark");
      setIsDark(true);
    }
  };

  return { isDark, toggleTheme, isMounted };
}
