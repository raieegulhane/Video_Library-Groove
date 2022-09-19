import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("dark-theme");

const ThemeProvider = ({ children }) => {
    const currentTheme = localStorage.getItem("groovv-theme") || "dark-theme";
    const [theme, setTheme] = useState(currentTheme);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
}

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };