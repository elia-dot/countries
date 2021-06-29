import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const useDarkMode = () => {
  const [mode, setMode] = useLocalStorage("mode", "light");
  const [theme, setTheme] = useState(mode);

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    setTheme(mode);
  }, [mode]);

  return { theme, themeToggler };
};

export default useDarkMode;
